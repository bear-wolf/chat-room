var commonModel = require('./common-model');
var self, _public;

const ValidateStatus = {
    SAVE: 'save',
    REMOVE: 'remove'
}

self = {
    validate: function (json, key) {
        var result = false;

        switch (key) {
            case ValidateStatus.SAVE: {
                if (json.email && json.password) {
                    result = true;
                }
                break;
            }
            case ValidateStatus.REMOVE: {
                if (json.id) {
                    result = true;
                }
                break;
            }

            default: {
                break
            }
        }

        return result;
    },
    changeRoleAfterSignIn: function (id, callback) {
        var modelUser = global.db.User,
            reply = global.models.reply.createInstance();

        modelUser
            .save({
                id: id,
                role_id: global.models.role.TYPE_ACTIVE,
                date_update: global.common.date.getNow()
            })
            .then((rows, data)=>{
                reply
                    .setStatus(true)
                    .setData({})
            })
            .catch((data)=>{
                reply
                    .setStatus(false)
                    .setMessage(data);
            })
            .finally((data)=>{
                callback(reply);
            })
    }
}

_public = {
    constructor: function () {
        this.reply = global.models.reply.createInstance();

        return this;
    },
    //Registry user
    actionCheckIn: function (json) {
        var _this = this,
            modelUser = global.db.User,
            reply = global.models.reply.createInstance(),
            role = global.models.role;

        if (!self.validate(json, ValidateStatus.SAVE)) {
            reply
                .setStatus(false)
                .setMessage('No verify format of request')

            _this.callReplyHandler(reply);

            return this;
        }

        json['date_create'] = global.common.date.getNow();
        json.role_id = role.TYPE_CHECK_IN;

        modelUser
            .save(json)
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setMessage('Your email added saccessffully');

                _this.callReplyHandler(reply);
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error)

                _this.callReplyHandler(reply);
            });
    },

    //Sign in
    actionSignIn: function (json) {
        var _this = this,
            modelUser = global.db.User;

        if (!self.validate(json, ValidateStatus.SAVE)) {
            _this.reply
                .setStatus(false)
                .setMessage('No verify format of request');

            _this.callReplyHandler(_this.reply)
        }

        modelUser
            .getByPermission(json)
            .then((data)=>{

                self.changeRoleAfterSignIn(data[0].id, function (reply) {
                    if (reply.status) {
                        delete reply.body.password;

                        _this.reply
                            .setStatus(true)
                            .setData(reply.body);
                    } else {
                        _this.reply
                            .setStatus(false);
                    }
                })
                return false;
            })
            .catch((error)=>{
                _this.reply
                    .setStatus(false)
                    .setMessage(error);
            })
            .finally(()=>{
                var userData = _this.reply.body;

                if (userData && userData.profile_id) {
                    _this.getProfileById(userData);
                } else _this.callReplyHandler(_this.reply);
            });
    },

    getProfileById: function (userData) {
            var _this = this,
                modelProfile = global.db.Profile;

            modelProfile
                .getById(userData.profile_id)
                .then((data)=>{
                    if (!data) {
                        _this.reply
                            .setStatus(false)
                            .setMessage(data);

                        return false;
                    }

                    userData.profile = data.dataValues;
                    _this.reply
                        .setStatus(true)
                        .setData(userData);
                })
                .catch((data)=>{
                    _this.reply
                        .setStatus(false)
                        .setMessage(data);
                })
                .finally((data)=>{
                    _this.callReplyHandler(_this.reply);
                });
    },
    //Sign out
    actionLogOut: function (token) {
        var _this = this,
            reply = global.models.reply.createInstance();

        if (!token) {
            reply.setStatus(true)

            _this.callReplyHandler(reply);
            return this;
        }

        global.redis.removeData(token, function (error, data) {
            if (!error) {
                reply
                    .setStatus(true)
                    .setMessage('Your token has removed');
            } else {
                reply
                    .setStatus(false)
                    .setMessage('Your token not remove');
            }

            _this.callReplyHandler(reply);
        })
    }
}

var AuthModel = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }
        Obj.prototype = Object.create(commonModel.getInstance());

        return AuthModel.instance = new Obj().constructor();
    },
    save: function (user) {
        return this;
    },

    getInstance: function () {
        return AuthModel.instance;
    }
}

module.exports = AuthModel;