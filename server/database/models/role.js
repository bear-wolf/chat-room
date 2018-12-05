'use strict';

const ValidateStatus = {
    SAVE: 'save',
    REMOVE: 'remove'
}

const RoleStatus = {
    ACTIVE: 1, // aктивний користувач
    ONCHECK: 2, // роль на перевірці
    DISABLE: 3, // роль відключена
    REMOVED: 4, // Користувач видалений
    GUEST: 5 // гість
}

var self = {
    validate: function (json, key) {
        var result = false;

        switch (key) {
            case ValidateStatus.SAVE: {
                if (json.description && json.status) {
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
    }
}

var Common;
var _public = {
    dbRole: null,

    constructor: function () {
        this.dbRole = global.dbModel.Role;
        Common = global.common;

        return this;
    },
    remove: (id)=> {
        var reply = global.models.reply.createInstance();

        if (!self.validate({
            id: id
        }, ValidateStatus.REMOVE)) {
            reply
                .setStatus(false)
                .setMessage('No validate');

            if (Common.isFunction(this.callback_error)) {
                this.callback_error(reply);
            }
            return;
        }

        return global.dbModel.Role.destroy({ where: { id: id }});
    },

    //return promise
    save: function (json) {
        var request,
            reply = global.models.reply.createInstance(),
            _this = this;


        if (!self.validate(json, ValidateStatus.SAVE)) {
            reply
                .setStatus(false)
                .setMessage('No validate');

            if (Common.isFunction(this.callback_error)) {
                this.callback_error(reply);
            }

            return;
        }

        if (json.id) {
            json['date_update'] = global.common.date.getNow();

            request = this.dbRole.update(json, {where: {id: Number(json.id)}});
        } else {
            json['date_create'] = global.common.date.getNow();
            json['status'] = RoleStatus.GUEST;

            request = this.dbRole.build(json).save();
        }

        request
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data);
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error);
            })
            .finally(()=>{
                _this.callback_error(reply.get());
            });

        return this;
    },
    //promise
    getById: function (id) {
        return this.dbRole.findByPk(id);
    },
    //promise
    getAll: function () {
        return this.dbRole.findAndCountAll();
    },
}

var Role = {
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

module.exports = Role;