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
    username = current_app.config['RP_API_KEY']
    password = current_app.config['RP_SECRET']

    finalAmount = amount * 100
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