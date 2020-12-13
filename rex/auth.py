from flask import (
    Blueprint, Flask, g, redirect, request, jsonify, make_response,current_app,_request_ctx_stack
)
from werkzeug.security import check_password_hash, generate_password_hash

from rex.db import get_db

import jwt 
import datetime

import rex.responses as json_responses

from functools import wraps


bp = Blueprint('auth',__name__,url_prefix='/auth')

@bp.route('/register',methods=['POST'])
def register():
    
    req =  request.get_json()
    password =  req.get("password")
    email = req.get("email")
    phone = req.get("phone")
    name =  req.get("name")
    upi = req.get("upi")

    responseObject = {
        'status':None, 
    }

    if name == None or password == None or email == None or upi == None : 
        responseObject['status']="name, password, email & upi requried"
        return make_response(jsonify(responseObject)),400
    
    db = get_db()
    cursor = db.cursor()

    if cursor.execute('SELECT user_id FROM user WHERE email = ?', (email,)).fetchone() is not None:
        responseObject['status']="user already exists"
        return make_response(jsonify(responseObject)),400

    cursor.execute(
                'INSERT INTO user (email, password, name,phone,upi) VALUES (?, ?,?,?,?)',
                (email, generate_password_hash(password),name,phone,upi)
            )
    db.commit()

    responseObject['status']="registered,successfully"
    return make_response(jsonify(responseObject)),201

@bp.route('/login',methods=['POST'])
def login():
    req =  request.get_json()
    password =  req.get("password")
    email = req.get("email")

    responseObject = {
        'status':None, 
        'token':None
    }

    if email==None or password==None:
        responseObject['status']="email and password required"
        return make_response(jsonify(responseObject)),400
    
    db = get_db()
    cursor = db.cursor()

    user =  cursor.execute('SELECT * FROM user WHERE email = ?', (email,)).fetchone()

    if user is None or check_password_hash(user['password'],password) is False:
        responseObject['status']="authentication failure"
        return make_response(jsonify(responseObject)),401
    
    sub = user['user_id']
    token = create_token(sub)
    responseObject['status']="Success"
    responseObject['token']=token.decode()

    return make_response(jsonify(responseObject)),200

def create_token(sub):
    payload = {
        'sub':sub,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1, seconds=5),
        'iat': datetime.datetime.utcnow(),
    }
    token = jwt.encode(payload,current_app.config['SECRET_KEY'],algorithm='HS256')
    return token
    

from werkzeug.local import LocalProxy
current_identity = LocalProxy(lambda: getattr(_request_ctx_stack.top, 'current_identity', None))

def login_required(func): 
    @wraps(func)
    def verify_token(*args, **kwargs):
        auth_token = request.headers.get('Authorization')
        if auth_token is None:
            errorResponse = json_responses.createResponse('7001','Authorization Header Required')
            # errorResponse['status']='7001'
            # errorResponse['message']='Authorization Header Required'
            return make_response(jsonify(errorResponse)),401
        try: 
            payload = jwt.decode(auth_token,current_app.config.get('SECRET_KEY'))
            # do I trust this payload or should I verify the existance of the user, one more time?
            current_app.logger.debug("INFO : %s",payload.get('sub'))
            _request_ctx_stack.top.current_identity = payload.get('sub') # if login is succesfull, store the user id in a global varibale ( alive only for the request)
            return func(*args, **kwargs)
        except jwt.ExpiredSignatureError:
            errorResponse = {}
            errorResponse['message']='Expired Token, Please Login Again'
            return make_response(jsonify(errorResponse)),401
        except jwt.InvalidSignatureError:
            errorResponse = {}
            errorResponse['message']='Invalid Token, Please Login Again'
            return make_response(jsonify(errorResponse)),401
    return verify_token

            