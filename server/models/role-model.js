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
    TYPE_GUEST: 1, // не розпізнаваний системою
    TYPE_DEMO: 2, // зайшов як гість (авторизований)
    TYPE_CHECK_IN: 2, //зареєструвався
    TYPE_ACTIVE: 4, //авторизувався

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

module.exports = Role;