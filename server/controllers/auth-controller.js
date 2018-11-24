var AuthController, _public, self;

self = {
}

_public = {
    constructor: function () {
        this.super();

        this.reply = global.models.reply.createInstance();

        return this;
    },
    createModel: function () {
        return global.models.auth.createInstance()
    },
    getModel: function () {

    },
    //Registry user
    actionCheckIn: function () {
        var _this = this,
            authModel = this.createModel(),
            bodyRequest = this.request.body;

        authModel
            .setReplyHandler(function (data) {
                _this.responce.end(JSON.stringify(data));
            })
            .actionCheckIn(bodyRequest);

        return this;
    },
    //Sign in
    actionSignIn: function () {
        var _this = this,
            authModel = this.createModel(),
            bodyRequest = this.request.body;

        authModel
            .setReplyHandler(function (reply) {
                global.token.create((error, token)=>{
                    if (error) {
                        reply
                            .setStatus(false)
                            .setMessage('Error by create token')

                        _this.responce.end(reply.toString());
                    } else {
                        var json = reply.get();

                        json['token'] = token;
                        //global.redis.setData(token, reply.getData());
                        _this.responce.end(JSON.stringify(json));
                    }
                })

            })
            .actionSignIn(bodyRequest);

        return this;
    },
    //Sign out
    actionLogOut: function () {
        var _this = this,
            authModel = this.createModel(),
            token = this.request.headers.authorization;

        authModel
            .setReplyHandler(function (reply) {
                _this.responce.end(reply.toString());
            })
            .actionLogOut(token);

        return this;
    },
    actionCheckToken: function () {
        var _this = this,
            token = this.request.headers.authorization;

        if (!token) {
            this.reply
                .setStatus(false)
                .setMessage('Token is not exist');
            this.responce.end(this.reply.get());

            return this;
        }

        global.redis.getData(token, function (error, data) {
            if (error) {
                this.reply
                    .setStatus(false)
                    .setMessage('error');
            } else {
                data = data || { status: true};

                _this.reply
                    .setStatus(true)
                    .setData(data);
            }

            _this.responce.end(_this.reply.toString());
        })

        return this;
    },
}

AuthController = {
    _message: null,

    setMessage: function (message) {
        this._message = message;

        return this;
    },
    getMessage: function () {
        return this._message;
    },
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
            for(var key in _public){
                self[key] = _public[key];
            }
        }

        Obj.prototype = Object.create(global.getControllers().BaseController.getInstance());

        return new Obj().constructor();
    },
    isGuard: function (req, res, next) {
        var token = req.headers.authorization;

        if (!token) {
            this.setMessage({
                status: false,
                message: 'Not authoried user'
            });
            return false;
        }

        global.redis.getData(token, function (error, data) {
            return next(error, data);
        })

        return false;
    },
}


module.exports = AuthController;