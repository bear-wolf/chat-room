'use strict';

var Common;

var ValidateStatus = {
    SAVE: 'SAVE',
    GET: 'GET'
};

var _public = {
    dbParticipant: null,

    validateStatus: ValidateStatus,

    validate: function (json, key) {
        var result = false;

        switch (key) {
            case ValidateStatus.SAVE: {
                if (json.room_id && json.user_id && json.role_id)  {
                    result = true;
                }
                break;
            }
            case ValidateStatus.GET: {
                if (json.user_id) {
                    result = true;
                }
                break;
            }

            default: {
                break
            }
        }

        return result;
    },

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
        if (!this.validate(json, ValidateStatus.SAVE)) {
            reply
                .setStatus(false)
                .setMessage('Is not valid');

            if (Common.isFunction(_this.callback_error)) {
                _this.callback_error(reply);
            }
        }

        if (!json.id) {
            json['date_create'] = global.common.date.getNow();
            request = this.dbParticipant.build(json).save();
        } else {
            json['date_update'] = global.common.date.getNow();
            request = this.dbParticipant.update(json, {
                where: {id: Number(json.id)}
                // returning: false
            });
        }

        this.data = json;

        request
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data);

                if (Common.isFunction(_this.callback_successfully)) {
                    _this.callback_successfully(reply);
                }
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error);

                if (Common.isFunction(_this.callback_error)) {
                    _this.callback_error(reply);
                }
            });

        return request;
    },

    getById: function (id) {
        return this.dbParticipant.findById(id);
    },
    //return promise
    getByJSON: function (json) {
        return this.dbParticipant.findAll({
            where: json
        });
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