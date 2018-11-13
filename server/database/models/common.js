
var CommonModel, _public;

_public = {
    reply_handler: null, // ответ от модели
    callback: null,
    callback_successfully: null,
    callback_finally: null,
    callback_error: null,

    constructor: function () {
        return this;
    },
    super: function () {
        return this;
    },
    setReplyHandler: function (handler) {
        this.reply_handler = handler;

        return this;
    },
    callReplyHandler: function(data) {
        this.reply_handler(data);
    },
    setCallBack: function (callback) {
        this.callback = callback;

        return this;
    },
    setCallBackSuccessfully: function (callback_successfully) {
        this.callback_successfully = callback_successfully;

        return this;
    },
    setCallBackError: function (callback_error) {
        this.callback_error = callback_error;

        return this;
    },
    setCallBackFinally: function (callback_finally) {
        this.callback_finally = callback_finally;

        return this;
    },
    getConfig: function () {
        return global.config;
    }
}

CommonModel = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return this.instance = new Obj().constructor();
    },
    getInstance: function () {
        return this.instance || this.createInstance();
    }
}


module.exports = CommonModel;