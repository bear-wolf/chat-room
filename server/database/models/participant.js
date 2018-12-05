'use strict';

var Common;

var _public = {
    dbParticipant: null,

    constructor: function () {
        this.dbParticipant = global.dbModel.Participant;
        Common = global.common;

        return this;
    },
    //return promise
    sync: ()=> {
        return global.sequelize.sync() // promise
    },
    //promise
    remove: (json)=> {
        var reply = global.models.reply.createInstance();

        //validate
        if (!json.room_id || !json.user_id) {
            reply
                .setStatus(false)
                .setMessage('not valid');

            if (Common.isFunction(this.callback_error)) {
                this.callback_error(reply.get());
            }
        }

        //need json.user_id & json.room_id
        return global.dbModel.Participant.destroy({ where: {
            user_id: json.user_id,
            room_id: json.room_id
        }});
    },

    //return promise
    save: function (json) {
        var request,
            reply = global.models.reply.createInstance(),
            _this = this;

        //validate
        if (!json.room_id || !json.user_id) {
            reply
                .setStatus(false)
                .setMessage('not valid');

            if (Common.isFunction(_this.callback_error)) {
                _this.callback_error(reply.get());
            }
        }

        json['date_create'] = global.common.date.getNow();
        request = this.dbParticipant.build(json);

        request
            .save()
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data);

                if (Common.isFunction(_this.callback_successfully)) {
                    _this.callback_successfully(reply.get());
                }
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error);

                if (Common.isFunction(_this.callback_error)) {
                    _this.callback_error(reply.get());
                }
            });

        return this;
    },
    getById: function (id) {
        return this.dbParticipant.findById(id);
    },
    getAll: function () {
        return this.dbParticipant.findAndCountAll();
    },
}

var Participant =  {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        Obj.prototype = Object.create(global.baseModel.createInstance());

        return this.instance = new Obj().constructor();
    },
    getInstance: function () {
        return this.instance || this.createInstance();
    }
}

module.exports = Participant