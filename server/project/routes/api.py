import random
import string
from flask import Blueprint, jsonify, request
from project import socketio

api_bp = Blueprint('api', __name__, url_prefix='/api')

UNIQUE_ROOMS = []

@api_bp.route('/room/create', methods=["GET"])
def get_room():
    id = create_unique_room()
    print(id)
    return jsonify({'room':id, 'error': ''})


def create_unique_room():
    global UNIQUE_ROOMS

    while True:
        N = 5
        id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))
        if id not in UNIQUE_ROOMS:
            UNIQUE_ROOMS.append(id)
            return id

@api_bp.route('/room/join', methods=["POST"])
def join_room():
    import random
    from project.routes.sockets import create_room
    import project.routes.sockets as socket_global

    response = request.json
    room = response['room']
    user = response['user']
    if room not in socket_global.ROOMS:
        create_room(room, user)
    if user in socket_global.ROOMS[room]['listOfUsers']:
        return jsonify({'error': 'user already exist', 'gifs': []})
    else:
        available_gifs = socket_global.ROOMS[room]['availableGifs']

        list_gifs = []
        try:
            for i in range(5):
                id, url = available_gifs.popitem()
                gif_dict = {'id': id, 'gif': url}
                list_gifs.append(gif_dict)
                socket_global.ROOMS[room]['usedGifs'].append(gif_dict)
        except Exception as msg:
            print(msg)

        return jsonify({'error': '', 'gifs': list_gifs})


@api_bp.route('/room/select', methods=["POST"])
def user_select():

    import project.routes.sockets as socket_global

    try: 
        response = request.json
        room = response['room']
        user = response['user']
        gif = response['gif']

        socket_global.ROOMS[room]['gifPicks'][user] = gif
        socketio.emit('status', {'msg': socket_global.ROOMS[room]}, room=room)
        return jsonify({'error': '', 'selectedGif': gif})
    except Exception as msg:
        print(msg)
        return jsonify({'error': 'cannot post', 'selectedGif': ''})


def create_unique_room():
    global UNIQUE_ROOMS

    while True:
        N = 5
        id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=N))
        if id not in UNIQUE_ROOMS:
            UNIQUE_ROOMS.append(id)
            return id