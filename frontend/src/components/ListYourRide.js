// IMPORT DEPENDENCIES
import React, { useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

// IMPORT COMPONENTS

const ListYourRide = () => {
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        host: true,
        category: "",
        address: "",
        image: "",
        description: "",
        price: "",
    });

    const handleInput = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        console.log(name, value);
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetch(`/user/${user.email}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                city: formData.city,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
    };

    return (
        <Wrapper>
            <div>Become a host!</div>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInput}
                    required
                ></Input>
                <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInput}
                    required
                ></Input>
                <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInput}
                    required
                ></Input>
                <Button type="submit">CONFIRM</Button>
            </Form>
        </Wrapper>
    );
};

export default ListYourRide;

const Wrapper = styled.div`
    padding: var(--padding-page);
    font-size: 20px;
`;

const Form = styled.form``;

const Input = styled.input``;

const Button = styled.button``;
