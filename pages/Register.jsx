import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { eventId } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState('');
  const [f, setF] = useState({
    firstName: '', lastName: '', email: user?.email || '', phone: '', ticketType: 'General',
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  useEffect(() => { api.get(`/events/${eventId}`).then((r) => setEvent(r.data)); }, [eventId]);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/registrations', { ...f, event: eventId });
      nav('/success');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <main className="page center">
      <form onSubmit={submit} className="card form">
        <h2>Event Registration</h2>
        {event && <p className="muted">{event.title}</p>}
        <div className="row">
          <input placeholder="First name" value={f.firstName} onChange={set('firstName')} required />
          <input placeholder="Last name" value={f.lastName} onChange={set('lastName')} required />
        </div>
        <div className="row">
          <input type="email" placeholder="Email" value={f.email} onChange={set('email')} required />
          <input placeholder="Phone number" value={f.phone} onChange={set('phone')} />
        </div>
        <select value={f.ticketType} onChange={set('ticketType')}>
          <option>General</option>
          <option>VIP</option>
        </select>
        {error && <p className="error">{error}</p>}
        <button className="btn" type="submit">Register</button>
      </form>
    </main>
  );
}
