import * as React from "react";
import Section from "../../components/section";

import CreateRoom from "../../components/create-room";
import JoinRoom from "../../components/join-room";
import { Button } from "@material-ui/core";

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
        <h2>GIFS Against Humanity</h2>
        <hr
          style={{
            width: "80%",
            color: "darkblue"
          }}
        />
        {this.rendering()}
        <Section
          flexDirection="row"
          style={{
            padding: "30px"
          }}
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.toggle("join")}
            style={{
              margin: "3px"
            }}
          >
            Join Game
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.toggle("create")}
          >
            Create Game
          </Button>
        </Section>
      </Section>
    );
  }
}

export default MainScreen;
