const Registration = require('../models/Registration');
const wrap = require('../utils/asyncHandler');

exports.create = wrap(async (req, res) => {
  const reg = await Registration.create({ ...req.body, user: req.user.id });
  res.status(201).json(reg);
});

exports.mine = wrap(async (req, res) => {
  res.json(await Registration.find({ user: req.user.id }).populate('event').sort('-createdAt'));
});

exports.cancel = wrap(async (req, res) => {
  const reg = await Registration.findOneAndDelete({ _id: req.params.id, user: req.user.id });
  if (!reg) return res.status(404).json({ message: 'Registration not found' });
  res.json({ message: 'Cancelled' });
});

exports.stats = wrap(async (req, res) => {
  const total = await Registration.countDocuments();
  const mine = await Registration.countDocuments({ user: req.user.id });
  const byTicket = await Registration.aggregate([{ $group: { _id: '$ticketType', count: { $sum: 1 } } }]);
  const perDay = await Registration.aggregate([
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
    { $limit: 14 },
  ]);
  res.json({
    total,
    mine,
    byTicket: byTicket.map((t) => ({ name: t._id, count: t.count })),
    perDay: perDay.map((d) => ({ date: d._id, count: d.count })),
  });
});
