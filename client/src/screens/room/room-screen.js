import * as React from "react";
import Section from "../../components/section";

class RoomScreen extends React.PureComponent {

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log(id);
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
        HELLO ROOM!
      </Section>
    );
  }
}

export default RoomScreen;
