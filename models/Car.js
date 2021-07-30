const mongoose = require('mongoose')

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: String,
  seller:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

const Car = mongoose.model('Car', carSchema)
module.exports = Car
