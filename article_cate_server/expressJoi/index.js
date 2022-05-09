const joi = require('joi')

module.exports = (schema) => {
    return (req, res, next) => {

        ['body', 'params'].forEach((item) => {

            if (!schema[item]) return 

            const result = joi.object(schema[item]).validate(req[item])
            const {value, error} = result
            
            if (error) throw error
            else req.body = value
            next()
        })
        
    }
}