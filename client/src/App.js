import React, { Component } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";

import MainScreen from "./screens/main";
import RoomScreen from "./screens/room";

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact={true} path="/" component={MainScreen} />
          <Route exact={true} path="/room" component={RoomScreen} />
        </Switch>
      </main>
    );
  }
}

export default withRouter(App);
