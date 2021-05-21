import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "../src/components/Navbar/Navbar";
import Home from "../src/components/Home/Home";
import Auth from "../src/components/Auth/Auth";

function App() {
  return (
    <>
      <Router>
        <Container maxWidth="lg">
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
