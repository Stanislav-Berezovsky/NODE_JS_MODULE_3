import { logger } from '../helpers/loggerHelper';

const getAddItemParams = ({ serviceName, req }) => {
    const paramsMapper = {
        UserService: {
            login: req.body.login,
            password: req.body.password,
            age: req.body.age
        },
        GroupService: {
            name: req.body.name,
            permissions: req.body.permissions
        }
    };

    return paramsMapper[serviceName];
};

const loggerMiddleware = ({ serviceName, method }) => (req, res, next) => {
    let params;

    switch (method) {
        case 'addItem':
            params = getAddItemParams({ serviceName, req });
            params.id = req.params.id;
            break;
        case 'updateItem':
            params = getAddItemParams({ serviceName, req });
            break;
        case 'getItemById':
        case 'deleteItem':
            params = { id: req.params.id };
            break;
        case 'getAutosuggested':
            params = {
                loginSubstr: req.query.loginSubstring,
                limit: req.query.limit
            };
            break;
        case 'addUsersToGroup':
            params = {
                groupId: req.body.groupId,
                userIds: req.body.userIds
            };
            break;
        case 'getAllItems':
        default:
            params = {};
    }

    logger.log('info', `${serviceName}.${method} is called from controller with incoming params: ${JSON.stringify(params)}`);
    next();
};

export default loggerMiddleware;
