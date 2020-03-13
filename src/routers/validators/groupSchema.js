import joi from '@hapi/joi';

export const groupPostSchema = joi.object({
    name: joi.string()
        .alphanum()
        .required(),

    permissions: joi.array().items(joi.valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required()).required()
});

export const groupPutSchema = joi.object({
    name: joi.string()
        .alphanum(),

    permissions: joi.array().items(joi.valid('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required())
});
