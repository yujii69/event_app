import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <article className="card event-card">
      {event.image && <img src={event.image} alt={event.title} />}
      <h3>{event.title}</h3>
      <p className="muted">
        {event.date && new Date(event.date).toLocaleDateString()} · {event.location}
      </p>
      <p>{event.description}</p>
      <Link to={`/register/${event._id}`} className="btn">Register</Link>
    </article>
  );
}
