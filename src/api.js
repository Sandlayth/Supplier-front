// src/api.js
import axios from 'axios';
import { API_ENDPOINT } from './config';

let authToken = localStorage.getItem('authToken');

export const authenticateOnce = async (email, password) => {
  try {
    // Replace 'YOUR_AUTH_API_ENDPOINT' with your actual authentication API endpoint
    const response = await axios.post(`${API_ENDPOINT}/users/login`, {
      email,
      password,
    });

    // Assuming your API returns a bearer token on successful authentication
    authToken = response.data.access_token;
    localStorage.setItem('authToken', authToken);

    return authToken;
  } catch (error) {
    throw new Error('Invalid credentials');
  }
};

export const authenticatedAxios = async (url, method = 'get', data) => {
  if (!authToken) {
    throw new Error('Authentication required');
  }

  try {
    const response = await axios({
      method,
      url: `${API_ENDPOINT}/${url}`,
      data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Request failed');
  }
};
