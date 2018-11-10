import * as React from "react";
import Section from "../../components/section";
import Button from "../../components/button";
import IFrame from "../../components/card-gif";
import CAHcard from "../../components/cards-against-humanity";

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
        <CAHcard line="some random card" />
        <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
        <header>Welcome to Gifs Against Humanity :)</header>
        <form>
          <label>
            Name: <input type="text" name="name" />
            <br />
            Room: <input type="text" name="name" />
          </label>
        </form>

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
