import * as React from "react";
import Section from "../section";

class IFrame extends React.Component {
  state = {
    defaultHeight: "500px",
    defaultWidth: "500px"
  };
  render() {
    return (
      <Section>
        <iframe
          title="1"
          src={this.props.src}
          height={
            this.props.height ? this.props.height : this.state.defaultHeight
          }
          width={this.props.width ? this.props.width : this.state.defaultWidth}
        />
      </Section>
    );
  }
}

export default IFrame;
