var ProfileController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    actionGet: function () {
        var _this = this,
            modelProfile = global.db.Profile,
            reply = global.models.reply.createInstance();

        modelProfile
            .map()
            .findAll()
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data)

                _this.getResponce().end(reply.getToJSONstringify())
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error)

                _this.getResponce().end(reply.getToJSONstringify())
            });
    },
    actionSave: function () {
        var modelProfile = global.db.Profile;

        modelProfile
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

ProfileController = {
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


module.exports = ProfileController;