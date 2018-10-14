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
    signIn: function () {
        return this;
    },
    signOut: function () {
        return this;
    }
}


module.exports = AuthController;