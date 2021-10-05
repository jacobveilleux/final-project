// IMPORT DEPENDENCIES
import React from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import RidePage from "./RidePage";
import ListYourRide from "./ListYourRide";
import PostConfirmation from "./PostConfirmation";
import Profile from "./Profile";
import About from "./About";
import ContactUs from "./ContactUs";

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
                    <Route path="/list-your-ride">
                        <ListYourRide />
                    </Route>
                    <Route path="/confirmed">
                        <PostConfirmation />
                    </Route>
                    <Route exact path="/ride/:_id">
                        <RidePage />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/contact-us">
                        <ContactUs />
                    </Route>
                </Switch>
                {/* <Footer /> */}
            </Wrapper>
        </BrowserRouter>
    );
};

export default App;

const Wrapper = styled.div``;
