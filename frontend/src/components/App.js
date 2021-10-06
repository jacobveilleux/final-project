// IMPORT DEPENDENCIES
import React, { useContext } from "react";
import styled from "styled-components";
import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";

// IMPORT COMPONENTS
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
// import Footer from "./Footer";
import Home from "./Home";
import RidePage from "./RidePage";
import RiderRegistration from "./RiderRegistration";
import HostRegistration from "./HostRegistration";
import PostConfirmation from "./PostConfirmation";
import Profile from "./Profile";
import About from "./About";
import ContactUs from "./ContactUs";
import AuthContext from "./context/AuthContext";
import Login from "./Login";

const App = () => {
    const { currentUserLoaded, currentUser } = useContext(AuthContext);

    if (!currentUserLoaded) {
        return <span>Loading</span>;
    }

    return (
        <BrowserRouter>
            <GlobalStyles />
            <Wrapper>
                <Header />
                <Switch>
                    <Route exact path="/login">
                        <Login />
                    </Route>
                    <Route path="/riderRegistration">
                        <RiderRegistration />
                    </Route>
                    <Route path="/hostRegistration">
                        <HostRegistration />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/contact-us">
                        <ContactUs />
                    </Route>
                    {/* AUTHENTICATED ROUTES */}
                    <Route exact path="/">
                        {!currentUser ? (
                            <Redirect to="riderRegistration" />
                        ) : (
                            <Home />
                        )}
                    </Route>
                    <Route path="/host/id/:_id">
                        {!currentUser ? (
                            <Redirect to="riderRegistration" />
                        ) : (
                            <RidePage />
                        )}
                    </Route>
                    <Route path="/confirmed">
                        {!currentUser ? (
                            <Redirect to="riderRegistration" />
                        ) : (
                            <PostConfirmation />
                        )}
                    </Route>
                    <Route path="/profile">
                        {!currentUser ? (
                            <Redirect to="riderRegistration" />
                        ) : (
                            <Profile />
                        )}
                    </Route>
                </Switch>
                {/* <Footer /> */}
            </Wrapper>
        </BrowserRouter>
    );
};

export default App;

const Wrapper = styled.div``;
