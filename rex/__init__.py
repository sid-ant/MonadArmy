import os

from flask import Flask, request
import logging
from flask_cors import CORS

def create_app(test_config=None):

    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY="dev", 
        DATABASE=os.path.join(app.instance_path, 'rex.sqlite'),
    )

    # app.config.from_json('development.json') -- add a private key here 

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    from . import db
    db.init_app(app)

    from . import auth
    app.register_blueprint(auth.bp)

    from . import hello
    app.register_blueprint(hello.bp)

    from . import jobs
    app.register_blueprint(jobs.bp)

    @app.before_request
    def logrequest():
        app.logger.debug("%s",request)
        app.logger.debug("%s",request.get_json())

    @app.after_request
    def logresponse(response):
        app.logger.debug(response)
        app.logger.debug("%s",response.get_json())
        return response

    return app

