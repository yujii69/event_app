const r = require('express').Router();
const c = require('../controllers/authController');
const auth = require('../middleware/auth');

r.post('/signup', c.signup);
r.post('/signin', c.signin);
r.get('/me', auth, c.me);

module.exports = r;
