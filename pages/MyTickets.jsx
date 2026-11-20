import { useEffect, useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function MyTickets() {
  const { user } = useAuth();
  const [regs, setRegs] = useState([]);

  const load = () => api.get('/registrations/mine').then((r) => setRegs(r.data));
  useEffect(() => { load(); }, []);

  const cancel = async (id) => {
    if (!confirm('Cancel this registration?')) return;
    await api.delete(`/registrations/${id}`);
    load();
  };

  return (
    <main className="page">
      <h2 className="heading">Welcome back, {user?.name}!</h2>
      <h3>My tickets</h3>
      {!regs.length && <p>You haven't registered for any events yet.</p>}
      <div className="list">
        {regs.map((r) => (
          <div key={r._id} className="card ticket">
            {r.event?.image && <img src={r.event.image} alt="" />}
            <div className="grow">
              <h4>{r.event?.title}</h4>
              <p className="muted">
                {r.event?.date && new Date(r.event.date).toLocaleDateString()} · {r.event?.location}
              </p>
              <p>{r.ticketType} ticket · <span className="badge">{r.status}</span></p>
            </div>
            <button className="btn small danger" onClick={() => cancel(r._id)}>Cancel</button>
          </div>
        ))}
      </div>
    </main>
  );
}
