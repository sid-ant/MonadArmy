from flask import (
    Flask, request, Blueprint, current_app, jsonify, make_response,_request_ctx_stack
)


import sqlite3
import random

from rex.db import get_db
from rex import responses
from rex.auth import login_required,current_identity
from rex import utils



bp = Blueprint('jobs',__name__,url_prefix='/jobs')

@bp.route('/create',methods=['POST'])
@login_required
def create():
    req =  request.get_json()

    title = req.get("title") # String 
    utils.nullCheck(title,"title")
    
    amount = req.get("amount") 
    utils.nullCheck(amount,"amount") # Float 

    detail = req.get("desc")  # String 
    utils.nullCheck(detail,"desc")

    category = req.get("category") # String  
    utils.nullCheck(category,"category")

    location = req.get("location") # String 
    utils.nullCheck(location,"location")
    
    db = get_db()

    user_details = db.execute('SELECT * FROM user WHERE user_id = ?',(int(current_identity),)).fetchone()
    
    if user_details is None:
        errResp = responses.createResponse('500','User Account Not Found: Please report this to us')
        return make_response(jsonify(errResp)),500

    current_app.logger.debug("found user_details as %s",user_details)

    name = user_details['name'] # String

    otp = random.randrange(11111,999999)


    query = 'INSERT into JOB (user_id,title,location,detail,category,price,poster,payment_status,otp,is_complete) VALUES (?,?,?,?,?,?,?,?,?,?)'
    try:
        db.execute(query,(int(current_identity),title,location,detail,category,amount,name,"initiated",otp,0))
        db.commit()
    except sqlite3.Error as er:
        current_app.logger.debug("SQL Lite Error : %s",er)
        errorResponse = responses.createResponse('x9001','Contraint Failure')
        return make_response(jsonify(errorResponse)),500

    body = {
        "payment_status" : "initiated",
        "otp" : otp
    }

    responseObject = {
        "status":"200",
        "message":"Job Created", 
        "body": body
    }
    return make_response(jsonify(responseObject)),201

@bp.route('/fetch',methods=['get'])
@login_required
def fetch():
    req =  request.get_json()
    db = get_db()

    user_details = db.execute('SELECT * FROM user WHERE user_id = ?',(int(current_identity),)).fetchone()
    
    if user_details is None:
        errResp = responses.createResponse('500','User Account Not Found: Please report this to us')
        return make_response(jsonify(errResp)),500

    current_app.logger.debug("found user_details as %s",user_details)

    user_id = user_details['user_id'] # String

    query = 'SELECT * FROM JOB WHERE worker = ? AND is_complete = 0'
    data = None
    try:
        data = db.execute(query,(int(current_identity),)).fetchone()
    except sqlite3.Error as er:
        current_app.logger.debug("SQL Lite Error : %s",er)
        errorResponse = responses.createResponse('x9001','Contraint Failure')
        return make_response(jsonify(errorResponse)),500

    if(data != None):
        print(data['title'])

    query = 'SELECT * FROM JOB WHERE user_id != ? AND is_complete = 0 AND is_accepted = 0'
    data = None
    try:
        print(user_id)
        data = db.execute(query,(int(current_identity),)).fetchall()
    except sqlite3.Error as er:
        current_app.logger.debug("SQL Lite Error : %s",er)
        errorResponse = responses.createResponse('x9001','Contraint Failure')
        return make_response(jsonify(errorResponse)),500

    jobs_list = []
    for row in data:
        job = {
            'title' : row['title'],
            'category' : row['category'],
            'price' : row['price'],
            'location' : row['location'],
            'description' : row['detail'],
            'poster' : row['poster'],
            'user_id' : row['user_id'],
            'updated_at' : row['updated'], 
            'job_id' : row['job_id']
        }
        jobs_list.append(job)

    body = {
        "has_active_jobs" : True,
        "jobs_list" : jobs_list
    }

    responseObject = {
        "status":"200",
        "message":"Job Created", 
        "body": body
    }
    return make_response(jsonify(responseObject)),200