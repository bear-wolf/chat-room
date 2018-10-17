var _public = {
    id: null,
    date_create: null,
    date_update: null,
    first_name: null,
    last_name: null,
    middle_name: null,

    constructor: function () {
        return this;
    }
}

var Profile = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return Profile.instance = new Obj().constructor();
    },
    save: function (user) {
        return this;
    },
    remove: function (user) {
        return this;
    },
    getInstance: function () {
        return Profile.instance;
    }
}
model.exports