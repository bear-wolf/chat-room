'use strict';


const ValidateStatus = {
    GET: 'get',
    SAVE: 'save',
    REMOVE: 'remove'
}

const MessageStatus = {
    READ: 1,
    NOTREAD: 2,
    SEND: 3
}

var Common;


var _public = {
    dbMessage: null,

    validateStatus: ValidateStatus,

    validate: function (json, key) {
        var result = false;

        switch (key) {
            case ValidateStatus.SAVE: {
                if (json.owner_id && json.description) {
                    if (json.participant_id || json.room_id){
                        result = true;
                    }
                }
                break;
            }
            case ValidateStatus.GET: {
                if (json.room_id || json.participant_id) {
                    result = true;
                }
                break;
            }
            case ValidateStatus.REMOVE: {
                if (json.id) {
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
        this.dbMessage = global.dbModel.Message;
        Common = global.common;

        return this;
    },
    //return promise
    sync: ()=> {
        return global.sequelize.sync() // promise
    },
    remove: (id)=> {
        var reply = global.models.reply.createInstance();

        if (!self.validate({id: id}, ValidateStatus.REMOVE)) {
            reply
                .setStatus(false)
                .setMessage('No validate');

            if (Common.isFunction(this.callback_error)) {
                this.callback_error(reply);
            }

            return;
        };

        return global.dbModel.Message.destroy({ where: { id: id }});
    },
    // return promise;
    save: function (bodyRequest, id) {
        var request;

        bodyRequest['status'] = MessageStatus.SEND;

        if (id) {
            bodyRequest['date_update'] = global.common.date.getNow();

            request = this.dbMessage.update(bodyRequest, {where: {id: Number(id)}});
        } else {
            bodyRequest['date_create'] = global.common.date.getNow();

            request = this.dbMessage.build(bodyRequest).save();
        }

        return request;
    },
    //return promise
    getById: function (id) {
        return this.dbMessage.findById(id);
    },
    //return promise
    getByJSON: function (json) {
        return this.dbMessage.findAll({
            where: json
        });
    },
    //return promise
    getByStatusNotRead: function () {
        return this.dbMessage.findAll({ where: {
                status: MessageStatus.NOTREAD
            }});
    },
    //return promise
    getLastCount: function () {
        return this.dbMessage.findAll({
            limit: Message.last_count,
            order: [ [ 'date_create', 'DESC' ]]
        });
    },
    //return promise
    getAll: function () {
        return this.dbMessage.findAndCountAll();
    },
}

var Message = {
    last_count: 20, // sho

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

module.exports = Message