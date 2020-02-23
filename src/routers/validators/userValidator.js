import joi from '@hapi/joi';

const schema = joi.object({
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


const validate = (req, res, next) => {
    const { error } = schema.validate(req.body, {
        allowUnknown: false,
        abortEarly: false
    });

    if (error && error.isJoi) {
        console.log(error.details);
        const validationErrors = error.details.map(({ message, context: { label } = {} } = {}) => ({
            [label]: message
        }));

        res.status(400).json({ message: 'Bad Reques', validationErrors });
    } else {
        // eslint-disable-next-line callback-return
        next();
    }
};

export default validate;
