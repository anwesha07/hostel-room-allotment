const express = require('express');

const userRoutes = require('./user/user.routes');

const router = express.Router();

router.use('/v1/users', userRoutes);

module.exports = router;
