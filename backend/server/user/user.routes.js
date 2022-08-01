const express = require('express');
const userController = require('./user.controller');
const userMiddleware = require('./user.middleware');

//creating a router object that aggregates all the routes under user module
const userRouter = express.Router();

userRouter.post(
    '/register', 
    userMiddleware.userRegistrationValidationMiddleware, 
    userMiddleware.confirmPasswordValidationMiddleware, 
    userController.registerStudent,
);

userRouter.post(
    '/login',
    userMiddleware.userLoginValidationMiddleware,
    userController.loginUser,
);


module.exports = userRouter;
// userRouter.get('/register', (req, res) => {
//     const user = db.findElementByEmail(req.body.email);
//     if (user) {
//         return res.status(400).send({
//             message: "User already exists",
//         });
//     }
// });