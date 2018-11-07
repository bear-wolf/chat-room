var UserController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    actionPage: function () {
      this.responce.end(JSON.stringify({user: true}));
    },    
    save: function () {
        var modelUser = global.models.user;

        if (modelUser.isValidate()) {
            modelUser.save()
        } else {
            this.responce.end('Not Valide');
        }
    },
    actionGetUsers: function () {
        var modelUser = global.db.User;

        modelUser
            .map()
            .findAll()
            .then((data)=>{
                debugger;
            })
            .catch((error)=>{
                debugger
            });
    },
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