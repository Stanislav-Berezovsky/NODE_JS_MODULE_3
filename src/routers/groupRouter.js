import { Router } from 'express';
import loggerMiddleware from './loggerMiddleware';
import validate from './validators/validator';
import { groupPostSchema, groupPutSchema } from './validators/groupSchema';
import authentication from './authenticationMiddleware';
import {
    getAllgroups,
    getGroupById,
    addNewGroup,
    updateGroup,
    deleteGroup
} from './contollers/groupController';

const router = Router();

router.get('/',
    authentication,
    loggerMiddleware({ serviceName:'GroupService', method: 'getAllItems' }),
    getAllgroups
);

router.get('/:id',
    authentication,
    loggerMiddleware({ serviceName:'GroupService', method: 'getItemById' }),
    getGroupById
);

router.post('/',
    authentication,
    validate(groupPostSchema),
    loggerMiddleware({ serviceName:'GroupService', method: 'addItem' }),
    addNewGroup
);

router.put('/:id',
    authentication,
    validate(groupPutSchema),
    loggerMiddleware({ serviceName:'GroupService', method: 'updateItem' }),
    updateGroup
);

router.delete('/:id',
    authentication,
    loggerMiddleware({ serviceName:'GroupService', method: 'deleteItem' }),
    deleteGroup
);

export default router;
