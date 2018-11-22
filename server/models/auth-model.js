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
            modelUser = global.db.User;

        if (!self.validate(json, ValidateStatus.SAVE)) {
            _this.callReplyHandler({
                status: false,
                message: 'No verify format of request'
            })

            return this;
        }

        modelUser
            .save({
                email: json.email,
                password: json.password
            })
            .then((data)=>{
                _this.callReplyHandler({
                    status: true,
                    message: 'Your email added saccessffully'
                })
            })
            .catch((error)=>{
                _this.callReplyHandler({
                    status: false,
                    message: error,
                })
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
                _this.reply
                    .setStatus(true)
                    .setData(data.dataValues);
            })
            .catch((error)=>{
                _this.reply
                    .setStatus(false)
                    .setMessage(error);
            })
            .finally(()=>{
                _this.callReplyHandler(_this.reply);
            });
    },

    //Sign out
    actionSignOut: function (token) {
        var _this = this,
            reply = global.models.reply.createInstance();

        if (!token) {
            reply.setStatus(true)

            return reply.getResponce();
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

            _this.callReplyHandler(reply.get());
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