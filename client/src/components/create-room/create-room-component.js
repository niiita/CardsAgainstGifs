import * as React from "react";
import Section from "../../components/section";

import * as axios from "axios";
import { Redirect } from "react-router";

class CreateRoomComponent extends React.Component {
  state = {
    name: "",
    redirect: false,
    roomID: ''
  };

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  submit() {
    axios.get(`http://localhost:5000/api/room/create`).then(res => {
      const id = res.data.room;
      this.setState({ roomID: id })
      this.setState({ redirect: true })
    });
  }
  render() {
    const { redirect, roomID } = this.state;

    if (redirect) {
      return <Redirect to={`/room?id=${roomID}`} />;
    }
    return (
      <Section>
        <input
          type="text"
          value={this.state.name}
          onChange={event => this.handleChange(event)}
        />
        <button onClick={() => this.submit()}>Submit</button>
      </Section>
    );
  }
}

export default CreateRoomComponent;
