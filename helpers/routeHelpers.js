const joi = require('joi')

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = validate(req.body, schema)

      if (result.error) {
        return res.status(400).json(result.error)
      } else {
        if (!req.value) {
          req.value = {}
        }
        if (!req.value['body']) {
          req.value['body'] = {}
        }
        req.value['body'] = result.value

        next()
      }
    }
  },
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = schema.validate({ param: req['params'][name] })

      if (result.error) {
        return res.status(400).json(result.error)
      } else {
        if (!req.value) {
          req.value = {}
        }
        if (!req.value['params']) {
          req.value['params'] = {}
        }
        req.value['params'][name] = result.value.param

        next()
      }
    }
  }
}