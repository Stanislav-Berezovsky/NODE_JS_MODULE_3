import joi from '@hapi/joi';

const userSchema = joi.object({
    login: joi.string()
        .alphanum()
        .required(),

    password: joi.string()
        .pattern(new RegExp('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'))
        .required(),

    age: joi.number()
        .greater(3)
        .less(131)
        .required()
});

export default userSchema;
