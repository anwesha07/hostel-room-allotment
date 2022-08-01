const express = require('express');

const userRouter = require('./user/user.routes');

// router is an express Router object that aggregates all the routes
// from the different modules
const router = express.Router();

router.use('/v1/users', userRouter);

module.exports = router;
