import * as React from "react";
import Section from "../../components/section";
import IFrame from "../../components/card-gif";
import socketIOClient from "socket.io-client";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";

class RoomScreen extends React.PureComponent {
  state = {
    id: "",
    name: "",
    socket: socketIOClient("http://127.0.0.1:5000/"),
    redirect: false,
    listOfUsers: []
  };

  componentDidMount() {
    const { socket } = this.state;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const name = urlParams.get("name");
    this.setState({ id: id });
    this.setState({ name: name });

    socket.on("connect", function() {
      console.log("Websocket connected!");
    });
    socket.on("status", data => {
      console.log(data);
      this.setState({
        listOfUsers: data.msg.listOfUsers
      });
    });

    socket.emit("join", { room: id, user: name });
  }

  handleStatus(msg) {
    this.setState({ ...this.state, listOfUsers: msg });
  }
  leaveRoom() {
    const { socket, id, name } = this.state;
    socket.emit("leave", { room: id, user: name });
    this.setState({
      redirect: true
    });
  }
  render() {
    const { listOfUsers } = this.state;
    return (
      <Section
        flexDirection="column"
        style={{
          padding: "30px"
        }}
        alignItems="center"
      >
        room
        {listOfUsers && listOfUsers}
        {this.state.redirect && <Redirect to="/" />}
        <Section>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.leaveRoom()}
          >
            Leave
          </Button>
        </Section>
      </Section>
    );
  }
}

export default RoomScreen;
