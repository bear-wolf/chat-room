var AuthController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        return this;
    }
}

AuthController = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        Obj.prototype = Object.create(global.getControllers().BaseController.createInstance());

        return new Obj().constructor();
    },
    isGuard: function (req, res, next) {
        //global.client.set('myKey', JSON.stringify({user: 'user', password: '1'}));
        if (!req.headers.authorization) return;

        global.client.get(req.headers.authorization, function (err, repl) {
            global.client.quit();
            if (err) {
                return false;
            } else if (repl) {
                return next(JSON.parse(repl));
            }
        });
    },
    //log in
    actionSignIn: function () {

        const id = global.crypto.randomBytes(16).toString("hex");

        global.client.set(id, JSON.stringify({}));
        return
    },
    //log out
    actionSignOut: function () {
        return;
    },
    //Registry
    actionSignOut: function () {
        return;
    }
}


module.exports = AuthController;