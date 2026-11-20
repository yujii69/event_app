import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Events from './pages/Events';
import Register from './pages/Register';
import Success from './pages/Success';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import MyTickets from './pages/MyTickets';

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/signin" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register/:eventId" element={<Protected><Register /></Protected>} />
        <Route path="/success" element={<Protected><Success /></Protected>} />
        <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
        <Route path="/tickets" element={<Protected><MyTickets /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
