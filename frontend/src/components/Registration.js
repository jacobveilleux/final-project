import React, { useState } from "react";
import styled from "styled-components";

const Regristration = () => {
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
        console.log(name, value);
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetch("/addrider", {
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
                console.log(data);
            });
    };

    return (
        <Wrapper>
            <div>Become a rider!</div>
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
                </AllInputs>
            </Form>
        </Wrapper>
    );
};

export default Regristration;

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
