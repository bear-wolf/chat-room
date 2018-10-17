var UserController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    actionPage: function () {
      this.responce.end(JSON.stringify({user: true}));
    },    
    createUser: function () {
        this.request


        // var db = global.getControllers().DataBase;
        //
        // db.createInstance();

    }
}

UserController = {
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


module.exports = UserController;