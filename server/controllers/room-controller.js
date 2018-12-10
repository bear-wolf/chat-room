'use strict';

var RoomController, _public, _private;

const ValidateStatus = {
    GET_INVITED: 'GET_INVITED',
}


var self = {
    getUserJoinProfile: function (users, profiles) {
        // for(let user of users) {
        //     //user
        // }

        return users;
    },
    saveInvitedUsers: function (room_id, list_users_id) {
        var modelParticipant = global.db.Participant,
            role = global.models.role;

        //list_users_id = [1, 6];

        list_users_id.forEach(function(item) {
            modelParticipant
                .setCallBackSuccessfully(function (reply) {
                    console.log('Add user['+ this.data.user_id +'] in participant.')
                })
                .setCallBackError(function (reply) {

                })
                .save({
                    room_id: room_id,
                    user_id: item,
                    role_id: role.TYPE_INVITED
                })
        });

    }
}

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    actionGet: function () {
        var request,
            _this = this,
            modelRoom = global.dbModel.Room,
            reply = global.models.reply.createInstance();

        if (this.request.params.id) {
            request = modelRoom.findByPk(this.request.params.id);
        } else {
            request = modelRoom.findAll();
        }

        request
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data);

                _this.responce.end(reply.getToJSONstringify())
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error);

                _this.responce.end(reply.getToJSONstringify())
            })
    },
    actionSave: function () {
        var _this = this,
            modelRoom = global.db.Room,
            bodyRequest = this.request.body,
            currentId = this.request.params.id;

        modelRoom
            .setCallBackSuccessfully(function (reply) {
                self.saveInvitedUsers(reply.body.id, bodyRequest.inviteUsersId);

                _this.responce.end(reply.toString());
            })
            .setCallBackError(function (reply) {
                _this.responce.end(reply.toString())
            })
            .save(bodyRequest, currentId);

        return this;
    },
    actionRemove: function () {
        var _this = this,
            modelRoom = global.db.Room,
            reply = global.models.reply.createInstance();

        if (!this.request.params.id) {
            reply
                .setStatus(false)
                .setMessage('Id not exist');

            _this.responce.end(reply.getToJSONstringify())

            return;
        }

        modelRoom
            .remove(this.request.params.id)
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data);

                _this.responce.end(reply.getToJSONstringify())
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error);

                _this.responce.end(reply.getToJSONstringify())
            })

        return this;
    },
    actionGetInviteUsers: function () {
        var _this = this,
            modelUser = global.db.User,
            modelProfile = global.db.Profile;

        modelUser
            .setCallBackSuccessfully(function (reply) {
                let users = reply.body;

                modelProfile
                    .getAll()
                    .then(function (data) {
                        if (data) {
                            reply.body = self.getUserJoinProfile(users, data.dataValues);
                        }

                        _this.responce.end(reply.toString())
                    })
                    .catch(function (data) {
                        _this.reply
                            .setStatus(false)
                            .setMessage(data)

                        _this.responce.end(reply.toString())
                    })

            })
            .setCallBackError(function (reply) {
                _this.responce.end(reply.toString())
            })
            .get({
                role_id: global.models.role.TYPE_ACTIVE
            })

        return this;
    },

    //Get rooms by user in there are has as owner and participant
    actionGetHasUser: function () {
        var json,
            _this = this,
            bodyRequest = this.request.body,
            participant = global.db.Participant,
            user = global.db.User,
            room = global.db.Room,
            reply = global.models.reply.createInstance();

        json = {
            user_id: bodyRequest.user_id
        };

        if (!participant.validate(json, participant.validateStatus.GET)) {
            reply
                .setStatus(false)
                .setMessage('List of parameters is not valid');

            _this.responce.end(reply.toString());

            return this;
        }

        participant
            .getByJSON(json)
            .then((data)=>{
                if (data) { //participants
                    var listParticipant = data.map(function(data){ return data.dataValues; });
                    var _data = data.map(function(data){ return data.dataValues['room_id']; });

                    return room
                        .getByJSON({ where: { id: _data } })
                        .then(rooms => {
                            var listRoom = rooms.map((data)=>{ return data.dataValues; });
                            var users = listRoom.map((x)=>{ return x.user_id; });

                            var arrUserId = users.filter(function(elem, pos) {
                                return users.indexOf(elem) == pos;
                            });

                            var arrUserAsParticipant = listParticipant.map((x)=>{ return x.user_id; });
                            arrUserAsParticipant = arrUserAsParticipant.filter(function(elem, pos) {
                                return arrUserAsParticipant.indexOf(elem) == pos;
                            });
                            arrUserId = arrUserId.concat(arrUserAsParticipant);

                            return user
                                .getByJSON({ id: arrUserId })
                                .then(user=>{
                                    var users = user.map((x)=>{ return x.dataValues; });

                                    reply
                                        .setStatus(true)
                                        .setData({
                                            room: listRoom,
                                            participant: listParticipant,
                                            user: users
                                        });
                                })
                                .catch((error)=>{
                                    reply
                                        .setStatus(false)
                                        .setMessage(error)
                                })
                        });
                } else {
                    reply
                        .setStatus(true)
                        .setData({});
                }
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error)
            })
            .finally(()=>{
                _this.getResponce().end(reply.toString())
            });
    }
}
 RoomController = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }
        Obj.prototype = Object.create(global.getControllers().BaseController.createInstance());

        return new Obj().constructor();

    },
}


module.exports = RoomController;