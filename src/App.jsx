import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';

// Components
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import Background3D from './components/Background3D';

// Pages
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';

/**
 * App Component
 * Main application component with routing configuration.
 * Wraps the app with AuthProvider and EventProvider for global state.
 * Features a 3D Audi R8 model as a background element.
 */

function App() {
  return (
    <Router>
      <AuthProvider>
        <EventProvider>
          <div className="min-h-screen relative">
            {/* 3D Background with Audi R8 */}
            <Background3D />

            {/* Main Content Layer */}
            <div className="relative z-10">
              {/* Navbar - appears on all pages except login */}
              <Routes>
                <Route path="/login" element={null} />
                <Route path="*" element={<Navbar />} />
              </Routes>

              {/* Main Routes */}
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/event/:id" element={<EventDetails />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <Dashboard />
                    </RequireAuth>
                  }
                />

                {/* Admin Only Route */}
                <Route
                  path="/admin"
                  element={
                    <RequireAuth adminOnly={true}>
                      <Admin />
                    </RequireAuth>
                  }
                />
              </Routes>
            </div>
          </div>
        </EventProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
