import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const EditContact = ({ contact, onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setName(contact.name);
    setEmail(contact.email);
    setPassword(contact.password);
    setPhone(contact.phone);
    setAddress(contact.address);
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email) {
      onSave({ ...contact, name, email, password, phone , address});
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formName" className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          value={email}
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
      <Button variant="primary" type="submit">
        Save
      </Button>
      <span> </span>
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default EditContact;
