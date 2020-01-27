import uuid from 'uuid';

const users = [
    {
        id: uuid.v4(),
        login: 'testlogin1autoSuggest',
        password: 'testpassword1',
        age: 21,
        isDeleted: false
    },
    {
        id: uuid.v4(),
        login: 'testlogin3autoSuggest',
        password: 'testpassword3',
        age: 23,
        isDeleted: false
    },
    {
        id: uuid.v4(),
        login: 'testlogin2',
        password: 'testpassword2',
        age: 22,
        isDeleted: false
    },
    {
        id: uuid.v4(),
        login: 'testlogin4',
        password: 'testpassword4',
        age: 24,
        isDeleted: false
    },
    {
        id: uuid.v4(),
        login: 'testlogin5autoSuggest',
        password: 'testpassword5',
        age: 25,
        isDeleted: false
    }
];

const checkLoginExisted = userLogin => users.some(({ login }) => userLogin.toLowerCase() === login.toLowerCase());

export const getUsers = () => users;

export const getUserById = userId => getUsers().find(({ id }) => id === userId);

export const getAutosuggestedUsers = ({ loginSubstring, limit }) => {
    const autosuggestedUsers = users
        .filter(({ login }) => login.toLowerCase().includes((loginSubstring || '').toLowerCase()))
        .sort((userA, userB) => userA.login < userB.login ? -1 : 1);
    return autosuggestedUsers.splice(0, limit || autosuggestedUsers.length);
};

export const deleteUserById = userId => {
    const user = getUserById(userId);

    if (user) {
        user.isDeleted = true;
    }
};

export const addUser = userProps => {
    const loginExisted = checkLoginExisted(userProps.login);
    !loginExisted && users.push({
        id: uuid.v4(),
        isDeleted: false,
        ...userProps
    });

    return !loginExisted;
};

export const updateUser = ({ id, ...userProps }) => {
    const user = getUserById(id);

    if (user) {
        if (user.login.toLowerCase() === userProps.login.toLowerCase() || !checkLoginExisted(userProps.login)) {
            Object.keys(userProps).forEach(key => {
                user[key] = userProps[key];
            });

            return { status: 200, message: 'user was successfully updated' };
        }

        return { status: 400, message: 'this login is already existed' };
    }

    return { status: 404, message: 'not found' };
};
