import * as React from "react";
import Section from "../section";

class IFrame extends React.Component {
  state = {
    defaultHeight: "250px",
    defaultWidth: "250px"
  };
  render() {
    return (
      <Section>
        <iframe
          title="1"
          src={this.props.src}
          style={{
            border: "0"
          }}
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
