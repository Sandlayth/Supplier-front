// src/AuthenticationForm.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { authenticateOnce } from './api';

const AuthenticationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const mutation = useMutation(() => authenticateOnce(email, password));

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const token = await mutation.mutateAsync();
      console.log('Authentication successful. Token:', token);
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Supplier Front</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? 'Logging in...' : 'Log In'}
        </Button>
      </Form>
    </Container>
  );
};

export default AuthenticationForm;
