import React, { Component } from "react";
import "./App.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Footer from "./components/footer";

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
        <Footer>
          <img
            src={require("./images/giphyLogo.gif")}
            alt="loading..."
            width="10%"
            style={{
              float: "left"
            }}
          />
        </Footer>
      </main>
    );
  }
}

export default withRouter(App);
