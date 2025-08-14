// App.tsx — Handles routing for Markade views [2025-08-06]

import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Shell from './components/Shell';
import Landing from './views/Landing';
import Login from './views/LoginPage';
import Register from './views/Register';
import Dashboard from './views/Dashboard';
import CreateLeaguePage from './views/CreateLeaguePage';
import LeaguePage from './views/LeaguePage';
import UiPlayground from './views/UiPlayground';
import GridPlayground from './views/GridPlayground';

function App() {
  const showPlayground = import.meta.env.VITE_SHOW_PLAYGROUND === "1";

  return (
    <Routes>
      <Route element={<Shell />}>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private (guarded by ProtectedRoute) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-league" element={<CreateLeaguePage />} />
          <Route path="/league/:leagueId/*" element={<LeaguePage />} />
          {showPlayground && (
            <>
              <Route path="/playground" element={<UiPlayground />} />
              <Route path="/grid-playground" element={<GridPlayground />} />
            </>
          )}
        </Route>
        <Route path="*" element={<Landing />} />
      </Route>
    </Routes>
  );
}

export default App;