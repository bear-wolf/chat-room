var commonModel = require('./common-model');
var self, _public;

self = {
    validation: function (json) {
        if (!json.email || !json.password) {
            return false;
        }

        return true;
    }
}

_public = {
    constructor: function () {
        return this;
    },
    //Registry user
    actionCheckIn: function (json) {
        var _this = this,
            user = global.models.user.createInstance();

        if (!self.validation(json)) {
            _this.callReplyHandler({
                status: true,
                //message: 'This Email or password is exist'
                message: 'No verify format of request'
            })
        }

        user
            .setEmail(json.email)
            .setPassword(json.password)
            .setCallBackSuccessfully(function (data) {
                _this.callReplyHandler({
                    status: true,
                    message: 'Your email added saccessffuly'
                })
            })
            .setCallBackError(function (data) {
                _this.callReplyHandler({
                    status: false,
                    message: data.message,
                })
            })
            .save();

        // user.getByPermission(json, function (data) {
        //     _this.callReplyHandler(data)
        // })
    },

    //Sign in
    actionSignIn: function (json) {
        var _this = this,
            user = global.models.user.createInstance();

        if (!self.validation(json)) {
            _this.callReplyHandler({
                status: true,
                //message: 'This Email or password is exist'
                message: 'No verify format of request'
            })
        }

        user
            .setEmail(json.email)
            .setPassword(json.password)
            .setCallBackSuccessfully(function (data) {
                var _data = {
                    status: true,
                    body: data
                };

                global.token.create(function (err, token) {
                    _data['token'] = token;
                    global.redis.setData(token, {
                        user: data
                    })
                    _this.callReplyHandler(_data);
                });
            })
            .setCallBackError(function (data) {
                _this.callReplyHandler({
                    status: false,
                    message: data.message,
                })
            })
            .getByPermission();
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

            _this.callReplyHandler(reply.getResponce());
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