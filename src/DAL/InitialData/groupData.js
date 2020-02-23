import uuid from 'uuid';

export const firstGroupId = uuid.v4();
export const secondGroupId = uuid.v4();

export default [
    {
        id: firstGroupId,
        name: 'testgroup1',
        permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    },
    {
        id: secondGroupId,
        name: 'testgroup2',
        permissions: ['READ', 'WRITE']
    }
];
