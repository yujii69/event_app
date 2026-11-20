const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const wrap = require('../utils/asyncHandler');

const sign = (u) => jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
const publicUser = (u) => ({ id: u._id, name: u.name, email: u.email });

exports.signup = wrap(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  if (await User.findOne({ email })) return res.status(400).json({ message: 'Email already in use' });
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 10) });
  res.status(201).json({ token: sign(user), user: publicUser(user) });
});

exports.signin = wrap(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: 'Invalid email or password' });
  res.json({ token: sign(user), user: publicUser(user) });
});

exports.me = wrap(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(publicUser(user));
});
