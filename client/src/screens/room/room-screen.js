import * as React from "react";
import Section from "../../components/section";
import IFrame from "../../components/card-gif";
import socketIOClient from "socket.io-client";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import CAHcard from "../../components/cards-against-humanity";
import "../../index.css";
import * as axios from "axios";

class RoomScreen extends React.PureComponent {
  state = {
    id: "",
    name: "",
    socket: socketIOClient("http://127.0.0.1:5000/"),
    redirect: false,
    listOfUsers: [],
    hand: [],
    usedGifs: []
  };

  componentDidMount() {
    const { socket } = this.state;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const name = urlParams.get("name");
    this.setState({ id: id });
    this.setState({ name: name });

    this.postRequest(id, name);

    socket.on("connect", function() {
      console.log("Websocket connected!");
    });
    socket.on("status", data => {
      console.log(data);
      this.setState({
        listOfUsers: data.msg.listOfUsers
      });
    });
  }

  postRequest(id, name) {
    axios
      .post("http://localhost:5000/api/room/join", {
        room: id,
        user: name
      })
      .then(response => {
        if (response.data.error.length > 0) {
          alert(response.data.error);
        } else {
          this.setState({ hand: response.data.gifs });
          console.log(this.state.hand);
          this.state.socket.emit("join", { room: id, user: name });
        }
      })
      .catch(error => {
        console.log(error);
      });
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
    const { listOfUsers, usedGifs, hand } = this.state;
    return (
      <Section
        flexDirection="column"
        style={{
          padding: "30px"
        }}
        alignItems="center"
      >
        <Section flexDirection="row" justifyContent="flex-end" width="100%">
          <Section flexDirection="column">
            <h4>Users</h4>
            <ul
              style={{
                listStyleType: "none"
              }}
            >
              {listOfUsers && listOfUsers.map(x => <li key={x}>{x}</li>)}
            </ul>
          </Section>
        </Section>
        <h3>Hand</h3>
        {this.state.redirect && <Redirect to="/" />}
        <Section>
          <div>
            <CAHcard>random prompt</CAHcard>
          </div>
        </Section>
        <Section
          flexDirection="horizontal"
          flexWrap="wrap"
          justifyContent="space-evenly"
        >
          {hand.map(x => {
            return <IFrame key={x.id} src={x.gif} />;
          })}
        </Section>
        <Button
          variant="contained"
          color="primary"
          onClick={() => this.leaveRoom()}
        >
          Leave
        </Button>
      </Section>
    );
  }
}

export default RoomScreen;
