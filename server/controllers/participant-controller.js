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
            modelParticipant = global.dbModel.Participant,
            reply = global.models.reply.createInstance();

        if (this.request.params.id) {
            request = modelParticipant.findByPk(this.request.params.id);
        } else {
            request = modelParticipant.findAll();
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
    // actionSave: function () {
    //     var request,
    //         _this = this,
    //         modelParticipant = global.db.Participant,
    //         bodyRequest = this.request.body,
    //         reply = global.models.reply.createInstance();
    //
    //     request
    //         .then((data)=>{
    //             reply
    //                 .setStatus(true)
    //                 .setData(data);
    //
    //             _this.responce.end(reply.getToJSONstringify())
    //         })
    //         .catch((error)=>{
    //             reply
    //                 .setStatus(false)
    //                 .setMessage(error);
    //
    //             _this.responce.end(reply.getToJSONstringify())
    //         })
    // },
    actionAddParticipant: function () {
        var _this = this,
            participant = global.db.Participant,
            bodyRequest = this.request.body,
            reply = global.models.reply.createInstance();

        bodyRequest['room_id'] = this.request.params.room_id;

        participant
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
            .save(bodyRequest);

        return this;
    },
    actionRemove: function () {
        var _this = this,
            participant = global.db.Participant,
            bodyRequest = this.request.body,
            reply = global.models.reply.createInstance();

        bodyRequest['room_id'] = this.request.params.room_id;

        participant
            .remove(bodyRequest)
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