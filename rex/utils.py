from flask import (
    Flask, request, Blueprint, current_app, jsonify, make_response,_request_ctx_stack
)

import os
from rex import responses

SECRET_KEY = os.environ.get("SECRET_KEY")
RP_API_KEY = os.environ.get("RP_API_KEY")
RP_SECRET = os.environ.get("RP_SECRET")

def nullCheck(val,name):
    if val is None: 
        resp = createResponse("101",name+" is not provided")
        return make_response(jsonify(resp)),400
