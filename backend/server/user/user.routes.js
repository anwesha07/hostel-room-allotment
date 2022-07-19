const express = require('express');

const userController = require('./user.controller');
const { createUserValidationMiddleware, updateUserValidationMiddleware } = require('./user.middleware');

const userRouter = express.Router();

/**
 * @api {get} /api/v1/users Get a list of all users
 * @apiName GetUserList
 * @apiGroup User
 *
 * @apiSuccess {Object[]} users List of all user objects
 * @apiSuccess {Number} users.id User Id
 * @apiSuccess {String} users.name User Name
 * @apiSuccess {Number} users.age User Age
 * @apiSuccess {String} [users.email] User Email
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "name": "Bob Marley",
 *         "age": 100,
 *         "email": "marley@harleydavidson.com"
 *       }
 *     ]
 */
userRouter.get('/', userController.getUsers);

/**
 * @api {get} /api/v1/users/:id Get details of a user
 * @apiName GetUserDetails
 * @apiGroup User
 *
 * @apiParam {Number} id User's unique ID
 *
 * @apiSuccess {Number} id User Id
 * @apiSuccess {String} name User Name
 * @apiSuccess {Number} age User Age
 * @apiSuccess {String} [email] User Email
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "Bob Marley",
 *       "age": 100,
 *       "email": "marley@harleydavidson.com"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "status": "failure",
 *       "statusCode": 404,
 *       "message": "No user found with id 2"
 *     }
}
 */
userRouter.get('/:id', userController.getUserById);

userRouter.post(
  '/',
  createUserValidationMiddleware,
  userController.createUser,
);

userRouter.put(
  '/:id',
  updateUserValidationMiddleware,
  userController.updateUserById,
);

userRouter.delete('/:id', userController.deleteUserById);

module.exports = userRouter;
