const User = require('../models/User')
const Car = require('../models/Car')

module.exports = {
  index: async (_req, res, _next) => {
    try {
      const users = await User.find({})
      res.status(200).json(users)
    } catch (err) {
      next(err)
    }
  },
  newUser: async (req, res, _next) => {
    try {
      const newUser = new User(req.value.body)
      const user = await newUser.save()
      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const { userId } = req.value.params

      const user = await User.findById(userId)
      res.status(201).json(user)
    } catch (err) {
      next(err)
    }
  },
  replaceUser: async (req, res, _next) => {
    try {
      const { userId } = req.value.params
      const newUser = req.value.body
      const user = await User.findByIdAndUpdate(userId, newUser)
      res.status(200).json({ success: true, user } )
    } catch (err) {
      next(err)
    }
  },
  updateUser: async (req, res, _next) => {
    try {
      const { userId } = req.value.params
      const newUser = req.value.body
      const user = await User.findByIdAndUpdate(userId, newUser)
      res.status(200).json({ success: true, user } )
    } catch (err) {
      next(err)
    }
  },
  getUserCars: async (req, res, _next) => {
    try {
      const { userId } = req.value.params
      const user = await User.findById(userId).populate('cars')
      res.status(200).json( user.cars )
    } catch (err) {
      next(err)
    }
  },
  newUserCar: async (req, res, _next) => {
    try {
      const { userId } = req.params
      const newCar = new Car(req.body)

      const user = await User.findById(userId)

      newCar.seller = user
      await newCar.save()

      user.cars.push(newCar)
      await user.save()
      res.status(201).json({ newCar } )
    } catch (err) {
      next(err)
    }
  }
}