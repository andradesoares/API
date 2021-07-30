const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')

const app = express()

//DB connection
mongoose.connect('mongodb://localhost:27017/apiproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true 
})

//Routes
const users = require('./routes/users')
const cars = require('./routes/cars')

//Middleware
app.use(logger('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Routes
app.use('/users', users)
app.use('/cars', cars)

//Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

//Error Handler function
app.use((err, req, res, next) => {
  const error  = app.get('env') === 'development' ? err : {}
  const status = err.status || 500

  //Respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  })

  //Respond to ourselves
  console.error(err)
})

//Start the server
const port = app.get('port') || 3000
app.listen(port, () => console.log(`Server is listen on port ${port}`))