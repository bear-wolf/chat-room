var TranslateController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        this.reply = global.models.reply.createInstance();

        return this;
    },
    actionGet: function () {
        var request,
            _this = this,
            translate = global.dbModel.Translate;

        if (this.request.params.id) {
            request = translate.findByPk(this.request.params.id);
        } else {
            request = translate.findAll();
        }

        request
            .then((data)=>{
                _this.reply
                    .setStatus(true)
                    .setData(data)

                _this.getResponce().end(_this.reply.getToJSONstringify())
            })
            .catch((error)=>{
                _this.reply
                    .setStatus(false)
                    .setMessage(error)

                _this.getResponce().end(_this.reply.getToJSONstringify())
            });
    },
    actionSave: function () {
        var _this = this,
            translate = global.db.Translate,
            bodyRequest = this.request.body,
            currentId = this.request.params.id;

        translate
            .setCallBackSuccessfully(function (reply) {
                _this.responce.end(reply.getToJSONstringify())
            })
            .setCallBackError(function (reply) {
                _this.responce.end(reply.getToJSONstringify())
            })
            .setCallBackFinally(function (reply) {
                _this.responce.end(reply.getToJSONstringify())
            })
            .save(bodyRequest, currentId)
    },
    actionRemove: function () {
        var _this = this,
            translate = global.db.Translate;

        translate
            .remove(this.request.params.id)
            .then((data)=>{
                _this.reply
                    .setStatus(true)
                    .setData(data);
            })
            .catch((reply)=>{
                _this.responce.end(reply.getToJSONstringify())
            })
            .finally((reply)=>{
                _this.responce.end(reply.getToJSONstringify())
            })

        return this;
    }
}

TranslateController = {
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


module.exports = TranslateController;