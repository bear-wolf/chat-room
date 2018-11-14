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
            p = this.dbUser.update(json, {where: { id: json.id } })
        } else {
            p = this.dbUser.create(json);
        }

        return p;
    },
    getByPermission: function (json) {
        return this.dbUser.findOne(json, {where: { email: json.email, password: json.password } });
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