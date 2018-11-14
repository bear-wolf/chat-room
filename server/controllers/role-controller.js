var RoleController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    actionGet: function () {
        var request,
            _this = this,
            role = global.db.Role,
            reply = global.models.reply.createInstance();

        if (this.request.params.id) {
            request = role.getById(this.request.params.id);
        } else {
            request = role.getAll();
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
            role = global.db.Role,
            currentId = this.request.params.id;

        if (currentId) {
            bodyRequest.id = currentId;
        }

        role
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
            role = global.db.Role,
            reply = global.models.reply.createInstance();

        if (!this.request.params.id) {
            reply
                .setStatus(false)
                .setMessage('Id not exist');

            _this.responce.end(reply.getToJSONstringify())

            return;
        }

        role
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

RoleController = {
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


module.exports = RoleController;