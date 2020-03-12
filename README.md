# npm command
## npm i
#### Update project dependencies 
## npm start
#### Use this command to ran application locally
## npm run db-init
#### Recreate DB using default values that you can find in */src/DAL/InitialData*  folder.

# API
*Add Content-Type: application/json to any request header*

## Login API

#### POST /login 
request body - {
  login: string,
  password: string
}
There is a nessecity getting token to have possibility use request below.
Add this token to *x-access-token* header, otherwise there will be no access to any other requests.

## User api

#### GET /users
#### GET /users/{:id}
#### GET /users/autoSuggest/?loginSubstring={all users that contains this substring}&limit={max number of returned users}
#### DELETE /users/{:id}
*Note: when user is deleted, it will be automatically deleted from all groups where he joined. It can be checked by UserGroup Api.*
#### POST /users
request body - { login: string, password: string, age: number }
- password must contain letters and numbers;
- user’s age must be between 4 and 130.
#### PUT /users/{:id}
request body - { login: string, password: string, age: number }
- password must contain letters and numbers;
- user’s age must be between 4 and 130.

## Group Api

#### GET /groups
#### GET /groups/{:id}
#### DELETE /groups/{:id}
*Note: when group is deleted, all users will be automatically deleted from this group. It can be checked by UserGroup Api.*
#### POST /groups
request body - { name: string, permissions: string[] }
- Permissions array can not be empty. It should have at least one of following values: READ | WRITE | DELETE | SHARE | UPLOAD_FILES
#### PUT /groups/{:id}
request body - { name: string, permissions: string[] }
- Permissions array can not be empty. It should have at least one of following values: READ | WRITE | DELETE | SHARE | UPLOAD_FILES

## UserGorupAPI
#### GET /usergroup/

#### POST GET /usergroup/
request body - { groupId: string, userIds: [] }