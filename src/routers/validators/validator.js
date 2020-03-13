const validate = schema =>  (req, res, next) => {
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
