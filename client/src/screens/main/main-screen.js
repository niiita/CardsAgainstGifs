import * as React from "react";
import Section from "../../components/section";
import { redirect } from "react-router-dom";

import CreateRoom from "../../components/create-room";
import JoinRoom from "../../components/join-room";

class MainScreen extends React.PureComponent {
  state = {
    option: ""
  };

  toggle(name) {
    this.setState({ option: name });
  }

  rendering() {
    if (this.state.option === "") {
      return <div />;
    } else if (this.state.option === "join") {
      return <JoinRoom />;
    } else {
      return <CreateRoom />;
    }
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
        <header>Welcome to Gifs Against Humanity :)</header>
        <button onClick={() => this.toggle("join")}>Join Game</button>
        <button onClick={() => this.toggle("create")}>Create Game</button>
        {this.rendering()}
      </Section>
    );
  }
}

export default MainScreen;
