import { createLogger, format, transports } from 'winston';

export const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.splat(),
        format.simple()
    ),
    transports: [new transports.Console()]
});

export const logServiceError = ({ name, method,  params, errorMessage }) =>
    logger.log('error', `${name}.${method} was called with following arguments are ${JSON.stringify(params)}, error message: ${errorMessage}`);
