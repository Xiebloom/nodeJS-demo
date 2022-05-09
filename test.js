const joi = require('joi')

const schema = {
    body: {
        str: joi.string().min(3).max(10)
    }
}

const req = {
    body: {
        str: 'str-test'
    }
}

const checkthis = (schema) => {

    ['body', 'param'].forEach((item) => {

        if (!schema[item]) return

        const result = joi.object(schema[item]).validate(req[item])
        const { value, error } = result

        if (error) throw error

        console.log(result)
    })
}

checkthis(schema)