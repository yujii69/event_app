const r = require('express').Router();
const c = require('../controllers/registrationController');
const auth = require('../middleware/auth');

r.post('/', auth, c.create);
r.get('/mine', auth, c.mine);
r.get('/stats', auth, c.stats);
r.delete('/:id', auth, c.cancel);

module.exports = r;
