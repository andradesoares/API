const express = require('express')

//const router = express.Router()
const router = require('express-promise-router')()

const UsersController = require('../controllers/users')

const { validateBody, validateParam } = require('../helpers/routeHelpers')
const { userSchema, userPatchSchema, userCarSchema, idSchema } = require('../helpers/validationSchemas')

router.route('/')
  .get(UsersController.index)
  .post(validateBody(userSchema), UsersController.newUser)

router.route('/:userId')
  .get(validateParam(idSchema, 'userId'), UsersController.index)
  .put(validateBody(userSchema), validateParam(idSchema, 'userId'),  UsersController.replaceUser)
  .patch(validateBody(userPatchSchema), validateParam(idSchema, 'userId'), UsersController.updateUser)
  .delete()

router.route('/:userId/cars')
  .get(validateParam(idSchema, 'userId'), UsersController.getUserCars)
  .post(validateBody(userCarSchema), validateParam(idSchema, 'userId'), UsersController.newUserCar)
  


module.exports = router