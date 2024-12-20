import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { EditProfile } from './pages/EditProfile';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/edit-profile" element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/register" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;