var commonModel = require('./common-model');
var self, _public;
var TOKEN_LENGTH = 32;

self = {
    validation: function (json) {
        if (!json.email || !json.password) {
            return false;
        }

        return true;
    },
    createToken: function (callback) {
        global.crypto.randomBytes(TOKEN_LENGTH, function(ex, token) {
            if (ex) callback(ex);

            if (token) callback(null, token.toString('hex'));
            else callback(new Error('Problem when generating token'));
        });
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

                self.createToken(function (err, token) {
                    _data['token'] = token;
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