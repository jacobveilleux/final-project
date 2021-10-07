// IMPORT DEPENDENCIES
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

// IMPORT COMPONENTS
import AuthContext from "./context/AuthContext";
import loginImage from "./assets/loginImage.jpg";

const Login = () => {
    let history = useHistory();
    const { setCurrentUser } = useContext(AuthContext);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

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
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${loginImage});
    background-size: cover;
    flex: 1;
    padding: var(--content-padding);
    overflow: hidden;
`;

const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(260, 260, 260, 0.5);
    height: 200px;
    width: 300px;
`;

const AllInputs = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
`;

const Button = styled.button`
    margin-top: 10px;
    border: none;
    background-color: var(--color-1);
    color: #fff;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
`;
