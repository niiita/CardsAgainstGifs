import * as React from "react";
import Section from "../section";

class CAHcard extends React.Component {
  state = {
    defaultHeight: "200px",
    defaultWidth: "800px"
  };
  render() {
    return (
      <Section>
        <CAHcard line={this.props.line} />
      </Section>
    );
  }
}

export default CAHcard;
