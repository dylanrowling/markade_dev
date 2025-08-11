// App.tsx — Handles routing for Markade views [2025-08-06]

import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './views/Landing';
import Login from './views/LoginPage';
import Register from './views/Register';
import Dashboard from './views/Dashboard.tsx'; // placeholder if needed
import CreateLeaguePage from './views/CreateLeaguePage.tsx';
import LeaguePage from './views/LeaguePage';

function App() {
  return (
    <div className="min-h-screen bg-background text-text font-market">
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private (guarded by ProtectedRoute) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-league" element={<CreateLeaguePage />} />
          <Route path="/league/:leagueId/*" element={<LeaguePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;