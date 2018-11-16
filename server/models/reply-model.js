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
    getData: function () {
        return this.body;
    },
    getFullData: function () {
        return {
            code: this.code,
            status: this.status,
            message: this.message,
            body: this.body,
        };
    },
    setStatus: function (status) {
        this.status = status;

        return this;
    },
    createJson: function () {
        var data = {
            status: this.status,
            message: this.message,
            body: this.body
        };

        return data;
    },
    get: function () {
        return this.createJson();
    },
    getToJSONstringify: function () {
        return JSON.stringify(this.createJson());
    },
    toString: function () {
        return JSON.stringify(this.createJson());
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