const Event = require('../models/Event');
const wrap = require('../utils/asyncHandler');

exports.list = wrap(async (req, res) => {
  const { q } = req.query;
  const filter = q ? { title: new RegExp(q, 'i') } : {};
  res.json(await Event.find(filter).sort('date'));
});

exports.get = wrap(async (req, res) => {
  const ev = await Event.findById(req.params.id);
  if (!ev) return res.status(404).json({ message: 'Event not found' });
  res.json(ev);
});

exports.create = wrap(async (req, res) => {
  res.status(201).json(await Event.create(req.body));
});
