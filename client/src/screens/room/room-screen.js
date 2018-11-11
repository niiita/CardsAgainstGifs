import * as React from "react";
import Section from "../../components/section";
import IFrame from "../../components/card-gif";
import socketIOClient from "socket.io-client";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import CAHcard from "../../components/cards-against-humanity";
import '../../index.css';
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
        room: <br/>
        {listOfUsers && listOfUsers}
        <br />
        <h3>Hand</h3>
        <ul>
          {hand.map(x => {
            return (
              <li key={x.id}>
                {x.id} {x.gif}
              </li>
            );
          })}
        </ul>
        {this.state.redirect && <Redirect to="/" />}
        <Section>
          
          <div>
          <CAHcard>
            random prompt
          </CAHcard>
          </div>
          
        </Section>
        
       <Section class="flexWrap">
          <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
          <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
          <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
          <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
          <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
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
