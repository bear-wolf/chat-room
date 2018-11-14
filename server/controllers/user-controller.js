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
        //var modelUser = global.models.user;
        var  modelUser = global.dbModel.User;

        // if (modelUser.isValidate()) {
        //     modelUser.save()
        // } else {
        //     this.responce.end('Not Valide');
        // }
    },
    actionGetUsers: function () {
        var _this = this,
            modelUser = global.dbModel.User,
            reply = global.models.reply.createInstance();

        modelUser
            .findAll()
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
            // .finnaly(()=>{
            //     _this.callReplyHandler(reply.getToJSONstringify());
            // });
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