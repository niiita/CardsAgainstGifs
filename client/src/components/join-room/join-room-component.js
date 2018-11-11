import * as React from "react";
import Section from "../section";
import { Redirect } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  }
});

class JoinRoomComponent extends React.Component {
  state = {
    name: "",
    redirect: false,
    roomID: ""
  };
  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }
  handleChangeRoomId(event) {
    this.setState({ roomID: event.target.value });
  }
  submit() {
    this.setState({
      ...this.state,
      redirect: true
    });
  }
  render() {
    const { name, redirect, roomID } = this.state;
    const { classes } = this.props;
    if (redirect) {
      return <Redirect to={`/room?id=${roomID}&name=${name}`} />;
    }
    return (
      <Section flexWrap="wrap">
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={name}
          onChange={event => this.handleChangeName(event)}
          margin="normal"
        />
        <TextField
          id="roomID"
          label="Room ID"
          className={classes.textField}
          value={roomID}
          onChange={event => this.handleChangeRoomId(event)}
          margin="normal"
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => this.submit()}
          size="small"
          style={{
            margin: "auto",
            height: "10px"
          }}
        >
          Submit
        </Button>
      </Section>
    );
  }
}

// TODO - IF NAME IS EMPTY, Dont redirect
export default withStyles(styles)(JoinRoomComponent);
