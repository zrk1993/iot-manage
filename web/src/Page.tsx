import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import App from './App';
import Login from './pages/Login';
import NotFound from './pages/404';

const Page: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App></App>} />
      <Route path="/404" element={<NotFound></NotFound>} />
      <Route path="/login" element={<Login></Login>} />
    </Routes>
  </Router>
);

export default Page;