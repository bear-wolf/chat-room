var _public = {
    id: null,
    date_create: null,
    date_update: null,
    status: null,
    description: null,

    constructor: function () {
        return this;
    }
}

var Role = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return Role.instance = new Obj().constructor();
    },
    save: function (user) {
        return this;
    },
    remove: function (user) {
        return this;
    },
    getInstance: function () {
        return Role.instance;
    }
}
model.exports