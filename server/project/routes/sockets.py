from flask_socketio import join_room, leave_room, emit
from project import socketio

"""
{
    '12ju2': [chris, kevin],
    '2312a': ['rob', 'ben']
}

{
    'awdada':{
        'captain': user
        'listOfUsers: [chris,adad,ada]
        'round': 1,
        'started: true,
        'room': adada,
    }

}

{
    'listOfGifs': [],
    'used': []
}
"""
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
    if user in ROOMS[room]:
        print("very bad")
    else:
        user_join_room(room, user)
        emit('status', {'msg': ROOMS[room]}, room=room)

@socketio.on('leave', namespace='/')
def on_leave(data):
    global ROOMS
    user = data['user']
    room = data['room']

    if room in ROOMS and user in ROOMS[room]:
        user_leave_room(room, user)
        emit('status', {'msg': ROOMS[room]}, room=room)
    else:
        print("very bad")


def create_room(room, user):
    global ROOMS

    ROOMS[room] = {
        'captain': user,
        'listOfUsers': [],
        'started': False,
        'listOfCards': [],
        'round': 0
    }

def user_join_room(room, user):
    global ROOMS
    ROOMS[room]["listOfUsers"].append(user)
    join_room(room)

def user_leave_room(room, user):
    global ROOMS
    ROOMS[room]["listOfUsers"].remove(user)
    leave_room(room)

def print_rooms():
    global ROOMS
    print(ROOMS)