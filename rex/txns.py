from flask import (
    Flask, request, Blueprint, current_app, jsonify, make_response,_request_ctx_stack
)


import sqlite3
import requests

from rex.db import get_db
from rex import responses
from rex.auth import login_required,current_identity
from rex import utils

bp = Blueprint('txns',__name__,url_prefix='/txn')


@bp.route('/create',methods=['POST'])
@login_required
def create():
    req =  request.get_json()

    txn_type = "INBOUND"

    amount = req.get("amount") # Real  
    utils.nullCheck(amount,"amount")
    
    job_id = req.get("job_id") 
    utils.nullCheck(job_id,"job_id") # String  

    db = get_db()
    cursor = db.cursor()

    url = 'https://api.razorpay.com/v1/orders'

    # take this from prod config -- not tracked on git, don't commit these even once
    username = utils.RP_API_KEY
    password = utils.RP_SECRET

    finalAmount = int(amount * 100)
    order_req = {
        "amount" : finalAmount, 
        "currency" : "INR"
    }

    resp = requests.post(url,json=order_req,auth=(username, password))
    current_app.logger.debug("got order create api raw response as %s",resp.content)


    if resp.status_code != 200: 
        errorResponse = responses.createResponse('x9002','RP Order Create Failure')
        return make_response(jsonify(errorResponse)),500
    
    respBody = resp.json()
    # current_app.logger.debug("got order create api response as %s",respBody)

    order_id = respBody['id']
    order_status = respBody['status']

    query = 'INSERT into TXNS (amount,order_id,order_status,job_id,txn_type) VALUES (?,?,?,?,?)'
    try:
        cursor.execute(query,(amount,order_id,order_status,job_id,txn_type))
        db.commit()
    except sqlite3.Error as er:
        current_app.logger.debug("SQL Lite Error : %s",er)
        errorResponse = responses.createResponse('x9001','SQL Failure')
        return make_response(jsonify(errorResponse)),500
    
    body = {
        "order_id" : order_id,
        "job_id" : job_id, 
        "txn_id" :  cursor.lastrowid
    }

    responseObject = {
        "status":"200",
        "message":"Txn Order Created", 
        "body": body
    }
    return make_response(jsonify(responseObject)),201

@bp.route('/update',methods=['POST'])
@login_required
def update():
    req =  request.get_json()
    
    success = req.get("success")
    utils.nullCheck(success,"success") # String  

    job_id = req.get("job_id")
    utils.nullCheck(job_id,"job_id") # String  


    txn_id = req.get("txn_id")
    utils.nullCheck(txn_id,"txn_id") # String  

    db = get_db()
    cursor = db.cursor()


    order_status = "APPROVED" if success else "FAILED"
    payment_status = 1 if success else 0 


    updateJobs = 'UPDATE job SET payment_status =? WHERE job_id =?'
    updateTxns = 'UPDATE txns SET order_status =? WHERE txn_id=?' 
    try:
        cursor.execute(updateJobs,(payment_status,job_id))
        cursor.execute(updateTxns,(order_status,txn_id))
        db.commit()
    except sqlite3.Error as er:
        current_app.logger.debug("SQL Lite Error : %s",er)
        errorResponse = responses.createResponse('x9001','SQL Failure')
        return make_response(jsonify(errorResponse)),500
    
    resp = responses.createResponse('200','Job marked '+order_status)
    return make_response(jsonify(resp)),500
    
@bp.route('/payout',methods=['POST'])
@login_required
def payout():
    req =  request.get_json()

    txn_type = "OUTBOUND"

    otp = req.get("otp") # Real  
    utils.nullCheck(otp,"otp")
    
    job_id = req.get("job_id") 
    utils.nullCheck(job_id,"job_id") # String  

    url = 'https://api.razorpay.com/v1/payouts'
    db = get_db()
    cursor = db.cursor()

    # take this from prod config -- not tracked on git, don't commit these even once
    username = utils.RP_API_KEY
    password = utils.RP_SECRET

    job_details = cursor.execute('SELECT * FROM job WHERE job_id = ?',(int(job_id),)).fetchone()
    
    if job_details is None:
        errResp = responses.createResponse('400','Job id Not Found: Please report this to us' + str(job_id))
        return make_response(jsonify(errResp)),400
    
    if job_details['otp'] != otp:
        errResp = responses.createResponse('500','INVALID OTP')
        return make_response(jsonify(errResp)),500

    user_details = db.execute('SELECT * FROM user WHERE user_id = ?',(int(current_identity),)).fetchone()
    
    if user_details is None:
        errResp = responses.createResponse('500','User Account Not Found: Please report this to us')
        return make_response(jsonify(errResp)),500

    vpa = user_details['upi']
    name = user_details['name']
    phone = user_details['phone']
    email = user_details['email']

    if(name == ''):
        name = user_details['email'].split('@')[0]

    account_number = '2323230030756441'

    amount = job_details['price']
    finalAmount = int(amount * 100)

    order_req = {
        "account_number": account_number,
        "amount": finalAmount,
        "currency": "INR",
        "mode": "UPI",
        "purpose": "payout",
        "fund_account": {
            "account_type": "vpa",
            "vpa": {
                "address": vpa
            },
            "contact": {
                "name": name,
                "email": email,
                "contact": phone,
                "type": "customer"
            }
        }
    }

    resp = requests.post(url,json=order_req,auth=requests.auth.HTTPBasicAuth(username, password))
    respBody = resp.json()
    current_app.logger.debug("payout create api raw response as %s, status %s", respBody, resp.status_code)

    if resp.status_code != 200: 
        errorResponse = responses.createResponse('x9002','RP Create Payout Failed')
        return make_response(jsonify(errorResponse)),500
    
    order_id = respBody['id']
    order_status = respBody['status']

    query = 'INSERT into TXNS (amount,order_id,order_status,job_id,txn_type) VALUES (?,?,?,?,?)'
    try:
        cursor.execute(query,(amount,order_id,order_status,job_id,txn_type))
        db.commit()
    except sqlite3.Error as er:
        current_app.logger.debug("SQL Lite Error : %s",er)
        errorResponse = responses.createResponse('x9001','SQL Failure')
        return make_response(jsonify(errorResponse)),500
    
    body = {
        "order_id" : order_id,
        "job_id" : job_id
    }

    responseObject = {
        "status":"200",
        "message":"Payout TXN Created", 
        "body": body
    }
    return make_response(jsonify(responseObject)),201
