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

    url = 'https://api.razorpay.com/v1/orders'

    # take this from prod config -- not tracked on git, don't commit these even once
    username = " "
    password = " "

    finalAmount = amount * 100
    order_req = {
        "amount" : finalAmount, 
        "currency" : "INR"
    }

    resp = requests.post(url,json=req,auth=requests.auth.HTTPBasicAuth(username, password))
    current_app.logger.debug("got order create api raw response as %s",resp)


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

    