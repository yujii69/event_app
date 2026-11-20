import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../api';

export default function Dashboard() {
  const [s, setS] = useState(null);
  useEffect(() => { api.get('/registrations/stats').then((r) => setS(r.data)); }, []);

  if (!s) return <main className="page"><p>Loading…</p></main>;

  return (
    <main className="page dashboard">
      <aside className="card sidebar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/">Events</Link>
        <Link to="/tickets">My Tickets</Link>
      </aside>

      <section className="grow">
        <h2 className="heading">Dashboard</h2>
        <div className="stats">
          <div className="card stat"><h1>{s.total}</h1><p>Total registrations</p></div>
          <div className="card stat"><h1>{s.mine}</h1><p>Your registrations</p></div>
        </div>

        <div className="card chart">
          <h4>Registrations per day</h4>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={s.perDay}>
              <XAxis dataKey="date" /><YAxis allowDecimals={false} /><Tooltip />
              <Line type="monotone" dataKey="count" stroke="#6d3fd1" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card chart">
          <h4>By ticket type</h4>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={s.byTicket}>
              <XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip />
              <Bar dataKey="count" fill="#a78bfa" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </main>
  );
}
