// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import AuthenticationForm from './AuthenticationForm';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthenticationForm />} />
          {/* Add additional routes as needed */}
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
