require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

const events = [
  { title: 'Neon Nights Festival', description: 'A night of electronic music and lights.', date: '2026-12-05', location: 'Cebu City', price: 800, capacity: 500, image: 'https://picsum.photos/seed/neon/400/240' },
  { title: 'Comedy Jam Live', description: 'Stand-up comedy with local favorites.', date: '2026-12-12', location: 'Dumaguete', price: 500, capacity: 200, image: 'https://picsum.photos/seed/comedy/400/240' },
  { title: 'Acoustic Under the Stars', description: 'Chill acoustic sets by the beach.', date: '2026-12-20', location: 'Dapitan', price: 300, capacity: 150, image: 'https://picsum.photos/seed/acoustic/400/240' },
];

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Event.deleteMany({});
  await Event.insertMany(events);
  console.log('Seeded', events.length, 'events');
  process.exit(0);
});
