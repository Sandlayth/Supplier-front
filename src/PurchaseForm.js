// src/PurchaseForm.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const PurchaseForm = ({ show, handleClose, handleCreate, locations }) => {
  const isFormValid = () => {
    // Check if all fields are filled properly
    const isQuantityValid = parseInt(quantity, 10) > 0; // Quantity must be greater than 0
    const isFeesValid = parseFloat(fees) >= 0; // Fees cannot be negative

    return (
      isQuantityValid &&
      date !== '' &&
      isFeesValid &&
      location !== ''
    );
  };

    // Function to get today's date in the format "YYYY-MM-DD"
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(getTodayDate());
  const [fees, setFees] = useState(0);
  const [location, setLocation] = useState('');

  const handleSave = () => {
    // Validate input fields before saving
    if (isFormValid()) {
      let isoDate = new Date(date).toISOString()
      // Pass the new purchase data to the parent component
      handleCreate({
        quantity: parseInt(quantity, 10),
        date: isoDate,
        fees: parseFloat(fees) / 100,
        location,
      });

      // Reset the form
      setQuantity('');
      setDate('');
      setFees('');
      setLocation('');

      // Close the modal
      handleClose();
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Purchase</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formFees">
            <Form.Label>Fees (%)</Form.Label>
            <Form.Control
              type="number"
              step="1"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              as="select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.supplierName})
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!isFormValid()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PurchaseForm;
