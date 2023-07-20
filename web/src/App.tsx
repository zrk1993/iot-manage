import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import CRoutes from './routes/index'

const NotFound = React.lazy(() => import('./pages/404'));

const Loading = () => {
  return (
    <div>加载中。。。</div>
  )
}

const App: React.FC = () => (
  <Router>
    <div>
      <Link to="/">
          <button>to: index</button>
      </Link>
      <Link to="/login">
          <button>to: login</button>
      </Link>
    </div>
    <CRoutes></CRoutes>
  </Router>
);

export default App;