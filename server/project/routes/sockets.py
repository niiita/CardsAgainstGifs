from flask_socketio import join_room, leave_room, emit
from project import socketio

ROOMS = {}

@socketio.on('connect', namespace='/')
def test_connect():
    print('Client connect')

@socketio.on('disconnect', namespace='/')
def test_disconnect():
    print('Client disconnected')

@socketio.on('join', namespace='/')
def on_join(data):
    global ROOMS

    room = data['room']
    user = data['user']
    
    # room hasn't started yet
    if room not in ROOMS:
        create_room(room, user)
    if user in ROOMS[room]['listOfUsers']:
        print("very bad")
    else:
        user_join_room(room, user)
        emit('status', {'msg': ROOMS[room]}, room=room)

@socketio.on('leave', namespace='/')
def on_leave(data):
    global ROOMS
    user = data['user']
    room = data['room']

    if room in ROOMS and user in ROOMS[room]['listOfUsers']:
        user_leave_room(room, user)
        emit('status', {'msg': ROOMS[room]}, room=room)
    else:
        print("very bad")

@socketio.on('start', namespace='/')
def start_game(data):
    global ROOMS
    user = data['user']
    room = data['room']

    # TODO check if the user is the captain
    ROOMS[room]['started'] = True
    ROOMS[room]['judge'] = room_user_turns(room)
    emit('status', {'msg': ROOMS[room]}, room=room)


def create_room(room, user):
    global ROOMS

    import project as gifs
    all_gifs = gifs.GIPHY_STORE

    ROOMS[room] = {
        'captain': user,
        'listOfUsers': [],
        'started': False,
        'judge': '',
        'availableGifs': all_gifs,
        'usedGifs': [],
        'round': 0,
        'userNotJudge': [],
        'userWasJudge': []
    }

def user_join_room(room, user):
    global ROOMS
    ROOMS[room]["listOfUsers"].append(user)
    ROOMS[room]["userNotJudge"].append(user)
    join_room(room)

def user_leave_room(room, user):
    global ROOMS
    ROOMS[room]["listOfUsers"].remove(user)
    if user in ROOMS[room]["userNotJudge"]:
        ROOMS[room]["userNotJudge"].remove(user)
    leave_room(room)

def room_user_turns(room):
    global ROOMS

    if len(ROOMS[room]['userNotJudge']) == 0:
        ROOMS[room]['userNotJudge'] = ROOMS[room]['userWasJudge']
    user_to_judge = ROOMS[room]['userNotJudge'].pop(0)

    ROOMS[room]['userWasJudge'].append(user_to_judge)
    return user_to_judge


def print_rooms():
    global ROOMS
    print(ROOMS)