import os
from flask import Flask
from flask_cors import CORS

GIPHY_STORE = {}

def create_app(script_info=None):
    # instantiate the app

    app = Flask(__name__)
    CORS(app)
    setup_blueprints(app)
    
    call_api()


    return app


def setup_blueprints(app):
    from project.routes.views import views_bp
    app.register_blueprint(views_bp)


def call_api():
    import requests
    giphy_key = os.getenv('GIPHY_API_KEY')
    limit = 50
    url = f'http://api.giphy.com/v1/gifs/trending?api_key={giphy_key}&limit={limit}'

    response = requests.get(url).json()

    for gif in response["data"]:
        GIPHY_STORE[gif['id']] = gif['embed_url']

