import * as React from "react";
import Section from "../../components/section";
import IFrame from "../../components/card-gif";

class RoomScreen extends React.PureComponent {
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
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
        <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
        <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
        <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
        <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
        <IFrame src="https://giphy.com/embed/1esph7X7LV6Xqb4pT2" />
      </Section>
    );
  }
}

export default RoomScreen;
