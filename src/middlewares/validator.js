const responseLib = require('../libs/responseLib');

const Joi = require('joi').extend(require('@joi/date'));


const customLoginValidateSchema = Joi.object({
    email: Joi.string().email()
        .required(),
    password: Joi.string()
        .max(20)
        .required()
        // source_type: Joi.number().required()
});

const customSignupValidateSchema = Joi.object({
    name: Joi.string()
        .required(),
    email: Joi.string().email()
        .required(),
    mobile: Joi.string()
        .required(),
    password: Joi.string()
        .max(20)
        .required()
        // source_type: Joi.number().required()
});


let loginValidate = async(req, res, next) => {
    try {
        const value = await customLoginValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }
    } catch (err) {
        let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
        res.status(400);
        res.send(apiResponse)
    }
}

let registerValidate = async(req, res, next) => {
    try {
        const value = await customSignupValidateSchema.validate(req.body);
        if (value.hasOwnProperty('error')) {
            throw new Error(value.error);
        } else {
            next();
        }
    } catch (err) {
        let apiResponse = responseLib.generate(true, ` ${err.message}`, null);
        res.status(400);
        res.send(apiResponse)
    }
}



module.exports = {
    loginValidate: loginValidate,
    registerValidate: registerValidate,
}