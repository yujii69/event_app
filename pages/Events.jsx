import { useEffect, useState } from 'react';
import api from '../api';
import EventCard from '../components/EventCard';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get('/events', { params: { q } })
      .then((r) => setEvents(r.data))
      .finally(() => setLoading(false));
  }, [q]);

  return (
    <main className="page">
      <input
        className="search"
        placeholder="Search events"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <h2 className="heading">Events</h2>
      {loading ? <p>Loading…</p> : (
        <div className="grid">
          {events.map((ev) => <EventCard key={ev._id} event={ev} />)}
          {!events.length && <p>No events found.</p>}
        </div>
      )}
    </main>
  );
}
