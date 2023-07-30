import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ContactList from "./components/ContactList";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const allContactAPI = 'http://localhost:5000/api/contacts';

  const fetchUserData = () => {
    fetch(allContactAPI)
      .then(response => response.json())
      .then(data => {
        setContacts(data);
      })
      .catch(error => {
        console.error("Error fetching contacts:", error);
      });
  };

  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddContact = (newContact) => {
    const addContactAPI = 'http://localhost:5000/api/contacts';
    fetch(addContactAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newContact),
    })
      .then(response => response.json())
      .then(data => {
        setContacts([...contacts, data]);
      })
      .catch(error => {
        console.error("Error adding contact:", error);
      });
  };

  const handleDeleteContact = (id) => {
    const deleteAPI = `http://localhost:5000/api/contacts/${id}`;
    fetch(deleteAPI, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        setContacts(contacts.filter((contact) => contact._id !== id));
      })
      .catch(error => {
        console.error("Error deleting contact:", error);
      });
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
  };

  const handleSaveContact = (updatedContact) => {
    const updateAPI = `http://localhost:5000/api/contacts/${updatedContact._id}`;
    fetch(updateAPI, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedContact),
    })
      .then(response => response.json())
      .then(data => {
        setContacts(
          contacts.map((contact) =>
            contact._id === updatedContact._id ? data : contact
          )
        );
        setEditingContact(null);
      })
      .catch(error => {
        console.error("Error updating contact:", error);
      });
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Container>
      <h1 className="my-4">Contacts</h1>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={4}>
              <SearchBar onSearch={handleSearch} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ContactList
                contacts={filteredContacts}
                onDelete={handleDeleteContact}
                onEdit={handleEditContact}
              />
            </Col>
          </Row>
        </Col>
        <Col md={12} className="mb-5">
          <h3 className="bg-secondary text-bg-darkbg-secondary text-bg-dark mt-5 mb-5 p-2 rounded">Contact Lists</h3>
          {editingContact ? (
            <EditContact
              contact={editingContact}
              onSave={handleSaveContact}
              onCancel={handleCancelEdit}
            />
          ) : (
            <AddContact onAdd={handleAddContact} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
