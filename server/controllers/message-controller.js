var ParticipantController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    actionGet: function () {
        var request,
            _this = this,
            bodyRequest = this.request.body,
            message = global.dbModel.Message,
            reply = global.models.reply.createInstance();

        if (this.request.params.id) {
            request = message.findByPk(this.request.params.id);
        } else {
            request = message.findAll();
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
            message = global.db.Message,
            bodyRequest = this.request.body,
            currentId = this.request.params.id,
            reply = global.models.reply.createInstance();


        message
            .setCallBackSuccessfully(function (_reply) {
                reply = _reply;
            })
            .setCallBackError(function (_reply) {
                reply = _reply;
            })
            .setCallBackFinally(function (_reply) {
                reply = _reply || reply;

                _this.responce.end(reply.getToJSONstringify())
            })
            .save(bodyRequest, currentId)
    },
    actionRemove: function () {
        var _this = this,
            message = global.db.Message,
            reply = global.models.reply.createInstance();

        message
            .remove(this.request.params.id)
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data);
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error);
            })
            .finally(()=>{
                _this.responce.end(reply.getToJSONstringify())
            })

        return this;
    }
}

ParticipantController = {
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


module.exports = ParticipantController;