import * as React from "react";
import Section from "../../components/section";

import * as axios from "axios";
import { Redirect } from "react-router";

class CreateRoomComponent extends React.Component {
  state = {
    name: ""
  };

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  submit() {
    axios.get(`http://localhost:5000/api/room/create`).then(res => {
      const roomID = res.data.room;
      console.log(res);
    });
    return <Redirect to="/room" />;
  }
  render() {
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
