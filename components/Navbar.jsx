import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, signout } = useAuth();
  const nav = useNavigate();

  return (
    <header className="navbar">
      <Link to="/" className="brand">Event Registration</Link>
      <nav>
        <Link to="/">Events</Link>
        {user && <Link to="/tickets">My Tickets</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user ? (
          <button className="btn small" onClick={() => { signout(); nav('/'); }}>Sign out</button>
        ) : (
          <Link to="/signin" className="btn small">Sign in</Link>
        )}
      </nav>
    </header>
  );
}
