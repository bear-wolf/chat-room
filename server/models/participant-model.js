var _public = {
    id: null,
    date_create: null,
    date_update: null,
    user_id: null,

    constructor: function () {
        return this;
    }
}

var Participant = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return Participant.instance = new Obj().constructor();
    },
    save: function (user) {
        return this;
    },
    remove: function (user) {
        return this;
    },
    getInstance: function () {
        return Participant.instance;
    }
}

module.exports = Participant;