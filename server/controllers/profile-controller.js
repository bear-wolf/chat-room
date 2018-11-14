var ProfileController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    actionGet: function () {
        var request,
            _this = this,
            modelProfile = global.dbModel.Profile,
            reply = global.models.reply.createInstance();

        if (this.request.params.id) {
            request = modelProfile.findByPk(this.request.params.id);
        } else {
            request = modelProfile.findAll();
        }

        request
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data)
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error)
            })
            .finally(()=>{
                _this.getResponce().end(reply.getToJSONstringify())
            });
    },
    actionSave: function () {
        var _this = this,
            bodyRequest = this.request.body,
            reply = global.models.reply.createInstance(),
            profile = global.db.Profile,
            currentId = this.request.params.id;

        profile
            .setCallBackSuccessfully(function (data) {
                reply
                    .setStatus(true)
                    .setData(data);

                _this.responce.end(reply.getToJSONstringify())
            })
            .setCallBackError(function (error) {
                reply
                    .setStatus(false)
                    .setMessage(error);

                _this.responce.end(reply.getToJSONstringify())
            })
            .save(bodyRequest, currentId);
    },

    actionRemove: function () {
        var _this = this,
            modelProfile = global.dbModel.Profile,
            reply = global.models.reply.createInstance();

        if (!this.request.params.id) {
            reply
                .setStatus(false)
                .setMessage('Id not exist');

            _this.responce.end(reply.getToJSONstringify())

            return;
        }

        modelProfile
            .remove(this.request.params.id)
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

        return this;
    }
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