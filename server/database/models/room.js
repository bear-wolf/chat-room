'use strict';

var Common;
var ValidateStatus = {
    SAVE: 'SAVE',
    GET: 'GET'
};

var _public = {
    dbRoom: null,

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
        this.dbRoom = global.dbModel.Room;

        Common = global.common;

        return this;
    },
    //return promise
    remove: (id)=> {
        return global.dbModel.Room.destroy({ where: { id: id }});
    },
    //return promise
    save: function (bodyRequest, id) {
        var request,
            reply = global.models.reply.createInstance(),
            _this = this;



        if (id) {
            bodyRequest['date_update'] = global.common.date.getNow();

            request = this.dbRoom.update(bodyRequest, {where: {id: Number(id)}});
        } else {
            bodyRequest['date_create'] = global.common.date.getNow();

            request = this.dbRoom.build(bodyRequest).save();
        }

        request
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data.dataValues);

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

                return false;
            })
            .finally(function () {
                if (Common.isFunction(_this.callback_finally)) {
                    _this.callback_finally(reply);
                }
            });

        return this;
    },
    //return promise
    getById: function (id) {
        return this.dbRoom.findById(id);
    },
    //return promise
    getAll: function () {
        return this.dbRoom.findAndCountAll();
    },
    //return promise
    getByJSON: function (json) {
        return this.dbRoom.findAll(json);
    },
}

var RoomModel = {
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

module.exports = RoomModel;