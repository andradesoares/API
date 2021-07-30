const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  cars: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'car'
  }]
})

const User = mongoose.model('User', userSchema)
module.exports = User
