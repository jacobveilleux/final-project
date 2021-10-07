// IMPORT DEPENDENCIES
import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import { Redirect, BrowserRouter, Switch, Route } from "react-router-dom";
import { FiLoader } from "react-icons/fi";

// IMPORT COMPONENTS
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
// import Footer from "./Footer";
import HelloHome from "./HelloHome";
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
        return <Loading />;
    }

    return (
        <BrowserRouter>
            <GlobalStyles />
            <Header />
            <Wrapper>
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
                        {!currentUser ? <HelloHome /> : <Home />}
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
            </Wrapper>
            {/* <Footer /> */}
        </BrowserRouter>
    );
};

export default App;

const Wrapper = styled.div`
    min-height: 100vh;
`;

const spin = keyframes`
  from {transform:rotate(0deg)};
    to {transform:rotate(360deg)};
`;

const Loading = styled(FiLoader)`
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    animation: ${spin} 1500ms linear infinite;
    color: var(--primary-color);
`;
