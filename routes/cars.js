const express = require('express')

//const router = express.Router()
const router = require('express-promise-router')()

const CarsController = require('../controllers/cars')

const { validateBody, validateParam } = require('../helpers/routeHelpers')
const { carSchema, idSchema, userCarSchema, carPatchSchema } = require('../helpers/validationSchemas')

router.route('/')
  .get(CarsController.index)
  .post(validateBody(carSchema), CarsController.newCar)

router.route('/:carId')
  .get(validateParam(idSchema, 'carId'), CarsController.getCar)
  .put(validateBody(userCarSchema), validateParam(idSchema, 'carId'), CarsController.replaceCar)
  .patch(validateBody(carPatchSchema), validateParam(idSchema, 'carId'), CarsController.updateCar)
  .delete(validateParam(idSchema, 'carId'), CarsController.deleteCar)

module.exports = router