
var BaseController, _public;

_public = {
    constructor: function () {
        return this;
    },
    super: function () {
        return this;
    },
    setRequest: function (request) {
        this.request = request;

        return this;
    },
    setResponce: function (responce) {
        this.responce = responce;

        return this;
    }
}

BaseController = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return new Obj().constructor();
    },
}


module.exports = BaseController;