import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Success() {
  const { user } = useAuth();
  return (
    <main className="page center">
      <div className="card success">
        <div className="check">✓</div>
        <h2>Registration Validated!</h2>
        <p><strong>Welcome, {user?.name}, and thank you for registering for our event!</strong></p>
        <p className="muted">Your registration is now confirmed. You can view it in My Tickets.</p>
        <Link to="/tickets" className="btn yellow">Continue</Link>
      </div>
    </main>
  );
}
