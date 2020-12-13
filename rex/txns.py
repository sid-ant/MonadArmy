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

    url = 'https://api.razorpay.com/v1/orders'

    # take this from prod config -- not tracked on git, don't commit these even once
    username = current_app.config['RP_API_KEY']
    password = current_app.config['RP_SECRET']

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
        db.execute(query,(amount,order_id,order_status,job_id,txn_type))
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
        "message":"Txn Order Created", 
        "body": body
    }
    return make_response(jsonify(responseObject)),201

@bp.route('/payout',methods=['POST'])
@login_required
def payout():
    req =  request.get_json()

    txn_type = "OUTBOUND"

    otp = req.get("amount") # Real  
    utils.nullCheck(amount,"amount")
    
    job_id = req.get("job_id") 
    utils.nullCheck(job_id,"job_id") # String  

    url = 'https://api.razorpay.com/v1/payouts'
    db = get_db()

    # take this from prod config -- not tracked on git, don't commit these even once
    username = current_app.config['RP_API_KEY']
    password = current_app.config['RP_SECRET']

    job_details = db.execute('SELECT * FROM job WHERE job_id = ?',(int(job_id),)).fetchone()
    
    if job_details is None:
        errResp = responses.createResponse('500','Job id Not Found: Please report this to us')
        return make_response(jsonify(errResp)),500
    
    if job_details['otp'] != otp:
        errResp = responses.createResponse('500','Job id Not Found: Please report this to us')
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

    query = 'INSERT into "transaction" (amount,order_id,order_status,job_id,txn_type) VALUES (?,?,?,?,?)'
    try:
        db.execute(query,(amount,order_id,order_status,job_id,txn_type))
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