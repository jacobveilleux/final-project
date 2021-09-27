// IMPORT DEPENDANCIES
import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Home from "./Home";
import ListYourRide from "./ListYourRide";
import Profile from "./Profile";
import Signup from "./Signup";

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Wrapper>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/list-your-ride">
                        <ListYourRide />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
            </Wrapper>
        </BrowserRouter>
    );
};

export default App;

const Wrapper = styled.div``;
