var _public = {
    id: null,
    date_create: null,
    date_update: null,
    user_id: null, // owner room
    participant_id: null,
    role_id: null,

    constructor: function () {
        return this;
    }
}

var Room = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return Room.instance = new Obj().constructor();
    },
    save: function (user) {
        return this;
    },
    remove: function (user) {
        return this;
    },
    getInstance: function () {
        return Room.instance;
    }
}

module.exports = Room;