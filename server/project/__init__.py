import os
from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO


GIPHY_STORE = {}

# setup extensions
socketio = SocketIO()

def create_app(script_info=None):

    app = Flask(__name__)
    CORS(app)
    setup_blueprints(app)

    # setup extensions
    socketio.init_app(app)

    call_api()
    return app


def setup_blueprints(app):
    from project.routes.views import views_bp
    from project.routes.api import api_bp
    from project.routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    app.register_blueprint(views_bp)
    app.register_blueprint(api_bp)


def call_api():
    import requests
    giphy_key = os.getenv('GIPHY_API_KEY')
    limit = 100
    url = f'http://api.giphy.com/v1/gifs/trending?api_key={giphy_key}&limit={limit}'

    response = requests.get(url).json()

    for gif in response["data"]:
        GIPHY_STORE[gif['id']] = gif['embed_url']

