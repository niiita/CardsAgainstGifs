from flask_socketio import join_room, leave_room, emit
from project import socketio


@socketio.on('connect', namespace='/')
def test_connect():
    print('Client connect')


@socketio.on('disconnect', namespace='/')
def test_disconnect():
    print('Client disconnected')


@socketio.on('join', namespace='/')
def on_join(data):
    print(data)
    room = data['room']
    join_room(room)
    emit('status', {'msg': f'someone has entered the room {room}.'}, room=room)

@socketio.on('leave', namespace='/')
def on_leave(data):
    username = data['username']
    room = data['room']
    print(username, room)
    leave_room(room)
    emit('status', {'msg': session.get('name') + ' has entered the room.'}, room=room)
