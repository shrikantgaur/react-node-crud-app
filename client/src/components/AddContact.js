import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddContact = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onAdd({ name, email, password, phone, address });
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName" className="mt-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail" className="mt-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPassword" className="mt-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formPhone" className="mb-3">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          value={phone}
          placeholder="Phone"
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formAddress" className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-3">
        Add Contact
      </Button>
    </Form>
  );
};

export default AddContact;
