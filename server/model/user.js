var _public = {
    id: null,
    role_id: null,
    profile_id: null,
    date_create: null,
    email: null,
    password: null,

    constructor: function () {
        return this;
    }
}

var User = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return User.instance = new Obj().constructor();
    },
    save: function (user) {
        return this;
    },
    remove: function (user) {
        return this;
    },
    getUserByPraticipantId: function (participant_id) {
        return this;
    },
    changeRole: function (role) {
        return this;
    },
    getInstance: function () {
        return User.instance;
    }
}
model.exports