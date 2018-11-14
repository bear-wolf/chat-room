'use strict';

var Common;
var _public = {
    dbRoom: null,

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
            bodyRequest['date_update'] = global.moment().unix();

            request = this.dbRoom.update(bodyRequest, {where: {id: Number(id)}});
        } else {
            bodyRequest['date_create'] = global.moment().unix();

            request = this.dbRoom.build(bodyRequest).save();
        }

        request
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data.dataValues);
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error);
            })
            .finally(function () {
                _this.callback_finally(reply);
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