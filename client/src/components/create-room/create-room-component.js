import * as React from "react";
import * as axios from "axios";
import { TextField, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import Section from "../../components/section";

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

class CreateRoomComponent extends React.Component {
  state = {
    name: "",
    redirect: false,
    roomID: ""
  };

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  submit() {
    axios.get(`http://localhost:5000/api/room/create`).then(res => {
      const id = res.data.room;
      this.setState({ roomID: id });
      this.setState({ redirect: true });
    });
  }

  render() {
    const { name, redirect, roomID } = this.state;
    const { classes } = this.props;
    if (redirect) {
      return <Redirect to={`/room?id=${roomID}&name=${name}`} />;
    }
    return (
      <Section>
        <TextField
          id="name"
          label="Name"
          className={classes.textField}
          value={this.state.name}
          onChange={event => this.handleChange(event)}
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

export default withStyles(styles)(CreateRoomComponent);
