// IMPORT DEPENDENCIES
import React, { useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

// IMPORT COMPONENTS

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const ListYourRide = () => {
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        category: "",
        imageSrc: "",
        description: "",
        price: "",
    });

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
        fetch(`/user/update/${user.email}`, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                host: true,
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.address,
                city: formData.city,
                category: formData.category,
                imageSrc: formData.imageSrc,
                description: formData.description,
                price: formData.price,
            }),
        }).then((res) => res.json());
    };

    return (
        <Wrapper>
            <div>Become a host!</div>
            <Form onSubmit={handleSubmit}>
                <AllInputs>
                    <Input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInput}
                        required
                    />
                    <Input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
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

                    <Select
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={formData.category}
                        onChange={handleInput}
                        required
                    >
                        <option value={null} label="Select a category"></option>
                        <option value="moto">Moto</option>
                        <option value="atv">ATV</option>
                        <option value="snowmobile">Snowmobile</option>
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
