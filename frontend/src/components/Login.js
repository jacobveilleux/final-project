// IMPORT DEPENDENCIES
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

// IMPORT COMPONENTS
import AuthContext from "./context/AuthContext";

const Login = () => {
    let history = useHistory();
    const { setCurrentUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = React.useState("");

    const handleInput = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.data) {
                    setCurrentUser(data.data);
                    history.push("/");
                } else {
                    setError(data.message);
                }
            });
    };

    return (
        <Wrapper>
            <div>Login</div>
            <Form onSubmit={handleSubmit}>
                <AllInputs>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInput}
                        required
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInput}
                        required
                    />
                    <Button type="submit">LOGIN</Button>
                    {error && <span>{error}</span>}
                </AllInputs>
            </Form>
        </Wrapper>
    );
};

export default Login;

const Wrapper = styled.div`
    padding: var(--padding-page);
    font-size: 20px;
`;

const Form = styled.form``;

const AllInputs = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 10px;
`;

const Button = styled.button``;
