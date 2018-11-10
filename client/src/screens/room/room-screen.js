import * as React from "react";
import Section from "../../components/section";
import IFrame from "../../components/card-gif";

class RoomScreen extends React.PureComponent {
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
