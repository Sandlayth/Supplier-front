// src/PurchaseList.js
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { authenticatedAxios } from './api';
import PurchaseForm from './PurchaseForm';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);
  const [locations, setLocations] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await authenticatedAxios('purchases');
        setPurchases(data);
      } catch (error) {
        console.error('Error fetching purchases:', error.message);
      }
    };

    const fetchLocations = async () => {
      try {
        const data = await authenticatedAxios('locations');
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error.message);
      }
    };


    fetchPurchases();
    fetchLocations();
  }, []);

  const handleCreatePurchase = async (newPurchase) => {
    try {
      // Send POST request to create a new purchase
      console.log(newPurchase)
      await authenticatedAxios('purchases', 'post', newPurchase);

      // Fetch updated purchase list
      const updatedPurchases = await authenticatedAxios('purchases');
      setPurchases(updatedPurchases);

      // Close the form modal
      setShowForm(false);
    } catch (error) {
      console.error('Error creating purchase:', error.message);
    }
  }

  return (
    <div>
      <h2>Purchase List</h2>
      <Button variant="primary" onClick={() => setShowForm(true)}>
        Create
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Fees</th>
            <th>Calculated Price</th>
            {purchases[0] && purchases[0].userName && <th>User</th>}
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id}>
              <td>{purchase.quantity}</td>
              <td>{new Date(purchase.date).toLocaleDateString()}</td>
              <td>{purchase.totalPrice}</td>
              <td>{purchase.fees}</td>
              <td>{purchase.totalPrice * (1 - purchase.fees)}</td>
              {purchase.userName && <td>{purchase.userName}</td>}
              <td>{purchase.locationName} ({purchase.supplierName})</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Modal for creating a new purchase */}
      <PurchaseForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        handleCreate={handleCreatePurchase}
        locations={locations} // Pass locations to the form
      />
    </div>
  );
};

export default PurchaseList;