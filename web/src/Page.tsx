import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import App from './App';
import Login from './pages/Login';
import NotFound from './pages/404';

import CRoutes from './routes';


const Page: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App></App>}>
        {CRoutes()}
      </Route>
      <CRoutes></CRoutes>
      <Route path="/login" element={<Login></Login>} />
      <Route path="*" element={<NotFound></NotFound>} />
    </Routes>
  </Router>
);

export default Page;