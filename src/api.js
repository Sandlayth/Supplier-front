// src/api.js
import axios from 'axios';
import { API_ENDPOINT } from './config';

let authToken = localStorage.getItem('authToken');

export const authenticateOnce = async (email, password) => {
  try {
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
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login on authentication error
      localStorage.removeItem('authToken');
      window.location.href = '/'; // Redirect to login page
    } else {
      throw new Error('Request failed');
    }
  }
};
