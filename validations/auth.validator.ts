import Joi from "joi"


export const registerValidatorSchema  = Joi.object({
    username : Joi.string().min(6).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(8).required(),
})


export const LoginValidatorSchema  = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().min(8).required(),
})