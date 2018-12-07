# chat-room
Node js, Angular v6+, webSocket

#Installation

You will be need install [Node.js](https://nodejs.org/), [Mysql](https://dev.mysql.com/downloads/installer/) and other dependencies from package manager.
```sh
$ mkdir chat-room
$ cd chat-room
$ cd server/
$ npm install -d
$ node server
$ cd ../front/
$ npm install -d
$ ng server
```

#server API:

##AuthController
/sign-in - authorization  
/log-out - log out from system  
/check-in - registration  
/is-auth - check token

##UserController

##ProfileController
POST - /profile/ - create user profile 
POST - /profile/:id - update user profile
DELETE - /profile/:id  - remove profile

##RoomController
GET /room/invite-users/ - get list users who 
POST - /room/ - create room for chatting between users

##ParticipantController
POST - /participant/invited - get list of room what I am as participant of room
DELETE - /participant/:id - remove user as participant some room of chatting