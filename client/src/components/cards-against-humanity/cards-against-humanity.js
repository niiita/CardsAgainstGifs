import * as React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import Section from "../section";

const styles = {
  card: {
    minWidth: 275,
    backgroundColor: "black"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

class CAHcard extends React.Component {
  state = {
    defaultHeight: "200px",
    defaultWidth: "800px"
  };

  render() {
    return (
      <Section>
        <Card
          line={this.props.line}
          style={{
            backgroundColor: "black",
            color: "white"
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="h2"
              className="square"
              style={{
                color: "white"
              }}
            >
              {this.props.question}
            </Typography>
          </CardContent>
        </Card>
      </Section>
    );
  }
}

export default withStyles(styles)(CAHcard);
