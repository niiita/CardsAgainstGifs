import * as React from "react";
import Section from "../../components/section";
import Button from "../../components/button";

class MainScreen extends React.PureComponent {
  render() {
    return (
      <Section
        flexDirection="column"
        style={{
          padding: "30px"
        }}
        alignItems="center"
      >
        <Button title="Create New Game" color="yellow">
          CREATE NEW GAME!
        </Button>
        <Button title="Join a Game" color="yellow">
          JOIN A GAME!
        </Button>
      </Section>
    );
  }
}

export default MainScreen;
