// IMPORT DEPENDENCIES
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

// IMPORT COMPONENTS
import AuthContext from "./context/AuthContext";
import riderImage from "./assets/riderImage.jpg";

const RiderRegistration = () => {
    const { setCurrentUser } = useContext(AuthContext);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        city: "",
        state: "",
        email: "",
        password: "",
    });

    const handleInput = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        setFormData({ ...formData, [name]: value });
    };

    let history = useHistory();

    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetch("/registerRider", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                surname: formData.surname,
                city: formData.city,
                state: formData.state,
                email: formData.email,
                password: formData.password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                const { status } = data;
                if (status === 200) {
                    setCurrentUser(data.data);
                    history.push(`/login`);
                    window.alert("succes!");
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
                    <Input
                        type="text"
                        name="name"
                        placeholder="First Name"
                        value={formData.name}
                        onChange={handleInput}
                        required
                    />
                    <Input
                        type="text"
                        name="surname"
                        placeholder="Last Name"
                        value={formData.surname}
                        onChange={handleInput}
                        required
                    />
                    <Input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInput}
                        required
                    />
                    <Input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInput}
                        required
                    />

                    <Button type="submit">CONFIRM</Button>
                    {error && <span>{error}</span>}
                </AllInputs>
            </Form>
        </Wrapper>
    );
};

export default RiderRegistration;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${riderImage});
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
    height: 400px;
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
