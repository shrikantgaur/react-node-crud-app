import React from "react";
import { Button, Table } from "react-bootstrap";

const ContactList = ({ contacts, onDelete, onEdit }) => {
  return (
    <Table >
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact,index) => (
          
          <tr key={contact._id}>
            <td>{index+1}</td>
            <td>{contact.name}</td>
            <td>{contact.email}</td>
            <td>{contact.phone}</td>
            <td>{contact.address}</td>
            <td>
              <Button variant="primary" onClick={() => onEdit(contact)}>
                Edit
              </Button>
              <span> </span>
              <Button variant="danger" onClick={() => onDelete(contact._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ContactList;
