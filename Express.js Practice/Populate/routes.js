
const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.post('/user', controllers.user);
router.post('/product', controllers.product);
router.get('/user/:id', controllers.userId);

module.exports = router; 