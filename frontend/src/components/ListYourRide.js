// IMPORT DEPENDENCIES
import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

// IMPORT COMPONENTS

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ListYourRide = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
        category: "",
        imageSrc: "",
        price: "",
        description: "",
    });

    let history = useHistory();

    const handleInput = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;

        if (name === "imageSrc") {
            toBase64(ev.target.files[0]).then((data) => {
                setFormData({
                    ...formData,
                    imageSrc: data.split(",")[1],
                });
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        fetch("/addhost", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                password: formData.password,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                category: formData.category,
                imageSrc: formData.imageSrc,
                price: formData.price,
                description: formData.description,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                const { status } = data;
                if (status === 200) {
                    window.localStorage.setItem(
                        "formData",
                        JSON.stringify(data.data)
                    );
                    history.push("/confirmed");
                }
            });
    };

    return (
        <Wrapper>
            <div>Become a host!</div>
            <Form onSubmit={handleSubmit}>
                <AllInputs>
                    <Input
                        type="text"
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
                        name="address"
                        placeholder="Address"
                        value={formData.address}
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

                    <Select
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleInput}
                        required
                    >
                        <option value={null} label="Select a category"></option>
                        <option value="Moto">Moto</option>
                        <option value="ATV">ATV</option>
                        <option value="Snowmobile">Snowmobile</option>
                    </Select>
                    <Input
                        type="file"
                        name="imageSrc"
                        placeholder="Image"
                        onChange={handleInput}
                        required
                    />
                    <Input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleInput}
                        required
                    />
                    <Description
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInput}
                        required
                    />
                </AllInputs>
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

const AllInputs = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 10px;
`;

const Select = styled.select`
    padding: 10px;
`;

const Description = styled.input`
    padding: 10px 200px 100px 10px;
`;

const Button = styled.button``;
