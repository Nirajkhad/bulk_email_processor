import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import Verification from '../pages/verification';
import Dashboard from '../pages/dashboard';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/email" element={<Email />} /> */}


      </Routes>
    </Router>
  );
}

export default AppRouter;