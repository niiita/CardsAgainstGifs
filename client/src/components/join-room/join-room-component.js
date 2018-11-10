import * as React from "react";
import Section from "../section";
import { Redirect } from "react-router-dom";
class JoinRoomComponent extends React.Component {
  state = {
    name: "",
    redirect: false,
    roomID: ""
  };
  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeRoomId(event) {
    this.setState({ roomID: event.target.value });
  }
  submit() {
    this.setState({
      ...this.state,
      redirect: true
    });
  }
  render() {
    const { name, redirect, roomID } = this.state;
    if (redirect) {
      return <Redirect to={`/room?id=${roomID}`} />;
    }
    return (
      <Section>
        <input
          type="text"
          value={name}
          onChange={event => this.handleChangeName(event)}
        />
        <input
          type="text"
          value={roomID}
          onChange={event => this.handleChangeRoomId(event)}
        />
        <button onClick={() => this.submit()}>Submit</button>
      </Section>
    );
  }
}

// TODO - IF NAME IS EMPTY, Dont redirect
export default JoinRoomComponent;
