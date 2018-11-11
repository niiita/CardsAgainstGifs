import * as React from "react";
import Section from "../../components/section";
import IFrame from "../../components/card-gif";
import socketIOClient from "socket.io-client";

class RoomScreen extends React.PureComponent {

  state = {
    id: '',
    endpoint: "http://127.0.0.1:5000/"
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.setState({ id: id })

    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('connect', function () {
      console.log('Websocket connected!');
    });
    socket.on('status', function (msg) {
      console.log(msg);
    });

    socket.emit('join', { 'room': id });

  }
  render() {
    return (
      <Section
        flexDirection="column"
        style={{
          padding: "30px"
        }}
        alignItems="center"
      >
        room
      </Section>
    );
  }
}

export default RoomScreen;
