'use strict';
var _public = {
    dbUser: null,

    constructor: function () {
        this.dbUser = global.dbModel.User;

        return this;
    },
    remove: (id)=> {
        return this.dbUser.destroy({ where: { id: id }});
    },

    //return promise
    save: function (json) {
        var p;

        if (json.id) {
            json['date_update'] = global.common.date.getNow();
            p = this.dbUser.update(json, {
                // return : true,
                where: { id: json.id }
            })
        } else {
            json['date_create'] = global.common.date.getNow();
            p = this.dbUser.create(json);
        }

        return p;
    },
    getByPermission: function (json) {
        //return this.dbUser.findAll(json, {where: { email: json.email, password: json.password } });
        return this.dbUser.findAll( {
            raw: true,
            where: { email: json.email, password: json.password }
        });
    },
    getByID: function (id) {
        var _this = this,
            reply = global.models.reply.createInstance();

        this.dbUser
            .findById(id)
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data);

                _this.callback_successfully(reply.get());
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error);

                _this.callback_error(reply.get());
            });
    },
    get: function (where) {
        var _this = this,
            reply = global.models.reply.createInstance();

        if (typeof where != "object") { return};

        this.dbUser
            .findAll({
                where: where
            })
            .then((data)=>{
                reply
                    .setStatus(true)
                    .setData(data.map(function(data){ return data.dataValues }));

                _this.callback_successfully(reply);
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error);

                _this.callback_error(reply);
            });
    }
}

var UserModel = {
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


module.exports = UserModel;