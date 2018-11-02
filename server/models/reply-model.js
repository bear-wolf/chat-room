var commonModel = require('./common-model');
var self, _public;

_public = {
    code: null,
    status: null,
    message: null,
    body: null,

    constructor: function () {
        return this;
    },

    setCode: function (code) {
        this.code = code;

        return this;
    },
    setMessage: function (message) {
        this.message = message;

        return this;
    },
    setData: function (data) {
        this.body = data;

        return this;
    },
    setStatus: function (status) {
        this.status = status;

        return this;
    },
    getResponce: function () {
        var data = {
            status: this.status,
            message: this.message,
            body: this.body
        };

        return data;
    }
}

var ReplyModel = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }
        Obj.prototype = Object.create(commonModel.getInstance());

        return new Obj().constructor();
    },
}



module.exports = ReplyModel;