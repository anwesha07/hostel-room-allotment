const express = require('express');

const userRouter = require('./user/user.routes');
const applicationRouter = require('./application/application.route');

// router is an express Router object that aggregates all the routes
// from the different modules
const router = express.Router();

router.use('/v1/users', userRouter);
router.use('/v1/application', applicationRouter);

module.exports = router;
