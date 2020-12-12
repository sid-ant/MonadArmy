from flask import (
    Flask, request, Blueprint, current_app, jsonify, make_response,_request_ctx_stack
)

from rex import responses

def nullCheck(val,name):
    if val is None: 
        resp = createResponse("101",name+" is not provided")
        return make_response(jsonify(resp)),400
