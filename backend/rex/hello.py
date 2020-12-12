from flask import (
    Flask, request, Blueprint, current_app, jsonify, make_response,_request_ctx_stack
)

from rex.db import get_db
from rex import responses
import sqlite3

from rex.auth import login_required,current_identity

bp = Blueprint('hello',__name__)

@bp.route('/check',methods=['GET'])
@login_required
def check():
    return 'Wake up Soldier, We\'ve got a city to burn'
