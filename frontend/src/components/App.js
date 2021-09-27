// IMPORT DEPENDANCIES
import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Profile from "./Profile";
import Signup from "./Signup";

const App = () => {
    return (
        <BrowserRouter>
            <GlobalStyles />
            <Wrapper>
                <Switch>
                    <Route exact path="/">
                        <Home />
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
