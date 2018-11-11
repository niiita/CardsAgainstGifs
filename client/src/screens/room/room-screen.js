import * as React from "react";
import Section from "../../components/section";
import IFrame from "../../components/card-gif";
import socketIOClient from "socket.io-client";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import CAHcard from "../../components/cards-against-humanity";
import "../../index.css";
import * as axios from "axios";
import "./room-screen.css";
import Swal from 'sweetalert2'

class RoomScreen extends React.PureComponent {
  state = {
    id: "",
    name: "",
    socket: socketIOClient("http://127.0.0.1:5000/"),
    redirect: false,
    listOfUsers: [],
    hand: [],
    usedGifs: [],
    captain: "",
    userPick: {},
    packet: {}
  };

  componentDidMount() {
    const { socket, userPick, hand } = this.state;
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const name = urlParams.get("name");
    this.setState({ id: id });
    this.setState({ name: name });

    this.postRequest(id, name);

    socket.on("connect", function () {
      console.log("Websocket connected!");
    });
    socket.on("status", data => {
      this.setState({ packet: data.msg });
      console.log(this.state.packet);
      this.setState({
        listOfUsers: data.msg.listOfUsers
      });
      this.setState({
        captain: data.msg.captain
      });
    });
    socket.on('notify-winner', data => {
      Swal({
        title: `Winner is ${data.msg}!`,
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok!'
      }).then((result) => {
        if (result.value) {
          axios
            .post("http://localhost:5000/api/room/hand/new", {
              room: id,
              user: name,
              gif: this.state.userPick
            })
            .then(response => {
              if (response.data.error.length > 0) {
                alert(response.data.error);
              } else {
                const newGif = response.data.newGif;
                if (newGif == '') {
                  this.setState({ userPick: {} })
                } else {
                  let new_hand = this.state.hand.map(x => x);
                  new_hand.push({
                    'gif': newGif.gif,
                    'id': newGif.id
                  })
                  new_hand = new_hand.filter((x) => x.id != this.state.userPick.id)
                  this.setState({ hand: new_hand })
                  this.setState({ userPick: {} })
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
    })
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
          this.state.socket.emit("join", { room: id, user: name });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  leaveRoom() {
    const { socket, id, name } = this.state;
    socket.emit("leave", { room: id, user: name });
    this.setState({
      redirect: true
    });
  }
  startGame() {
    const { socket, id, name } = this.state;
    socket.emit("start", { room: id, user: name });
  }

  selectOption(gif) {
    const { id, name } = this.state
    axios
      .post("http://localhost:5000/api/room/select", {
        room: id,
        user: name,
        gif: gif
      })
      .then(response => {
        if (response.data.error.length > 0) {
          alert(response.data.error);
        } else {
          this.setState({ 'userPick': response.data.selectedGif })
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  pickWinner(winner) {
    const { id, name } = this.state
    Swal({
      title: 'Are you sure?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        this.state.socket.emit("winner", { room: id, user: name, winner: winner });
      }
    })
  }
  render() {
    const {
      id,
      listOfUsers,
      usedGifs,
      hand,
      name,
      captain,
      started,
      packet,
      userPick
    } = this.state;
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
            <h2
              style={{
                textAlign: "right",
                margin: "15px 0px 0px 0px"
              }}
            >
              ROOM: {id}
            </h2>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.leaveRoom()}
            >
              Leave
            </Button>
            <h3
              style={{
                textAlign: "right",
                margin: "15px 0px 0px 0px"
              }}
            >
              Users
            </h3>
            <ul
              style={{
                listStyleType: "none",
                textAlign: "right",
              }}
            >
              {listOfUsers &&
                listOfUsers.map(x => (
                  packet.captain === x ?
                    <li key={x} className="captain">{x} (captain)</li>
                    :
                    <li key={x}>{x}</li>
                ))}
            </ul>
          </Section>
        </Section>
        {!packet.started && <h3>waiting to start game...</h3>}
        {name === captain && !packet.started && (
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.startGame()}
            >
              Start Game
            </Button>
          </div>
        )}
        {this.state.redirect && <Redirect to="/" />}
        {packet.started && <h3>Judge: {packet.judge}</h3>}

        {packet.started && name !== packet.judge && (
          <div>
            <Section justifyContent="center">
              <div>
                <CAHcard question={packet.question}></CAHcard>
              </div>
            </Section>
            <Section
              flexDirection="horizontal"
              flexWrap="wrap"
              justifyContent="space-evenly"
              style={{ paddingTop: "25px" }}
            >
              {hand.map(x => {
                return (
                  <div key={x.id} className={userPick.id === x.id ? 'iframe__container picked' : 'iframe__container'} onClick={() => this.selectOption(x)}>
                    <IFrame src={x.gif} />
                    <div className="overlay"></div>
                  </div>
                )
              })}
            </Section>
          </div>
        )}


        {packet.started && name === packet.judge && (
          <div>
            <Section>
              <div>
                <CAHcard question={packet.question}></CAHcard>
              </div>
            </Section>
            <Section
              flexDirection="horizontal"
              flexWrap="wrap"
              justifyContent="space-evenly"
              style={{ paddingTop: "25px" }}
            >

              {Object.keys(packet.gifPicks).map(x => {
                return (
                  <div className='iframe__container' onClick={() => this.pickWinner(x)}>
                    <IFrame key={packet.gifPicks[x].id} src={packet.gifPicks[x].gif} />
                    <div className="overlay"></div>
                  </div>
                )
              })}
            </Section>
          </div>
        )}

      </Section>
    );
  }
}

export default RoomScreen;
