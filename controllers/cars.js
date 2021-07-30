const Car = require('../models/Car')
const User = require('../models/User')

module.exports = {
  index: async (req, res, next) => {
    try{
      const cars = await Car.find({})
      res.status(200).json(cars)
    } catch (err) {
      next(err)
    }
    
  },
  newCar: async (req, res, next) => {
    try {
      const seller = await User.findById(req.value.body.seller)

      const newCar = req.value.body
      delete newCar.seller

      const car = new Car(newCar)
      car.seller = seller
      await car.save()

      seller.cars.push(car)
      seller.save()
      res.status(200).json(car)
    } catch (err) {
      next(err)
    }
  },
  getCar: async (req, res, next) => {
    try{
      const { carId } = req.value.params

      const car = await Car.findById(carId)
      res.status(200).json(car)
    } catch (err) {
      next(err)
    }
    
  },
  replaceCar: async (req, res, next) => {
    try {
      const { carId } = req.value.params
      const newCar = req.value.body
      const car = await Car.findByIdAndUpdate(carId, newCar)
      res.status(200).json({ success: true, car } )
    } catch (err) {
      next(err)
    }
  },
  updateCar: async (req, res, _next) => {
    try {
      const { carId } = req.value.params
      const newCar = req.value.body
      const car = await Car.findByIdAndUpdate(carId, newCar)
      res.status(200).json({ success: true, car } )
    } catch (err) {
      next(err)
    }
  },
  deleteCar: async (req, res, _next) => {
    try{
      const { carId } = req.value.params
      const car = await Car.findById(carId)
      if (!car) {
        return res.status(404).json({error:'Car doesn\'t exist'})
      }

      const sellerId = car.seller
      const seller = await User.findById(sellerId)

      await car.remove()
      seller.cars.pull(car)

      await seller.save()
      res.status(200).json({ success: true } )
    } catch (err) {
      next(err)
    }
  }
}