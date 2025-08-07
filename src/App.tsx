// App.tsx — Handles routing for Markade views [2025-08-06]

import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing';
import Login from './views/LoginTestView';
import Register from './views/Register';
import Dashboard from './views/Dashboard'; // placeholder if needed

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;