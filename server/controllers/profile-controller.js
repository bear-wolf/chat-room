var ProfileController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    actionGet: function () {
        var request,
            _this = this,
            bodyRequest = this.request.body,
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
        var request,
            _this = this,
            modelProfile = global.dbModel.Profile,
            bodyRequest = this.request.body,
            reply = global.models.reply.createInstance();

        if (this.request.params.id) {
            bodyRequest['date_update'] = global.moment().unix();

            request = modelProfile.update(bodyRequest, {where: {id: Number(this.request.params.id)}});
        } else {
            request = modelProfile.build(bodyRequest).save();
        }

        request
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