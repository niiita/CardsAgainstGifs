import os
from flask import Flask
from flask_cors import CORS


def create_app(script_info=None):
    # instantiate the app
    app = Flask(__name__)

    CORS(app)
    # set config

    app.config.from_object(app.config.DevelopmentConfig)

    setup_blueprints(app)
    return app



def setup_blueprints(app):
    from app.routes.views import views_bp
    app.register_blueprint(views_bp)