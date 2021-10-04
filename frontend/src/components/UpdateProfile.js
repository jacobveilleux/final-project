import React from "react";
import styled from "styled-components";

const UpdateProfile = () => {
    const { user } = useAuth0();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        city: "",
    });

    const handleInput = (ev) => {
        const name = ev.target.name;
        const value = ev.target.value;
        console.log(name, value);
        setFormData({ ...formData, [name]: value });
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
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInput}
                        required
                    />
                </AllInputs>
            </Form>
        </Wrapper>
    );
};

export default UpdateProfile;

const Wrapper = styled.div``;

const Form = styled.form``;

const AllInputs = styled.div``;

const Input = styled.input``;
