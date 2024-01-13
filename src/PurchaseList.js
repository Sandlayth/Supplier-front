// src/PurchaseList.js
import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { authenticatedAxios } from './api';

const PurchaseList = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const data = await authenticatedAxios('purchases');
        setPurchases(data);
      } catch (error) {
        console.error('Error fetching purchases:', error.message);
      }
    };

    fetchPurchases();
  }, []);

  return (
    <div>
      <h2>Purchase List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Date</th>
            <th>Total Price</th>
            <th>Fees</th>
            <th>Calculated Price</th>
            <th>User</th>
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
              <td>{purchase.user}</td>
              <td>{purchase.location}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PurchaseList;
