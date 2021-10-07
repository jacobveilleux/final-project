// IMPORT DEPENDENCIES
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

// IMPORT COMPONENTS
import AuthContext from "./context/AuthContext";
import hostImage from "./assets/hostImage.jpg";

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const HostRegistration = () => {
    const { setCurrentUser } = useContext(AuthContext);
    const [error, setError] = useState("");

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
        fetch("/registerHost", {
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
                    setCurrentUser(data.data);
                    history.push("/confirmed");
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
                    <Button type="submit">CONFIRM</Button>
                    {error && <span>{error}</span>}
                </AllInputs>
            </Form>
        </Wrapper>
    );
};

export default HostRegistration;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(${hostImage});
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
    height: 750px;
    width: 500px;
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

const Select = styled.select`
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
`;

const Description = styled.input`
    padding: 10px 200px 100px 10px;
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
