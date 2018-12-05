'use strict';

var Common;

var _public = {
    dbTranslate: null,

    constructor: function () {
        this.dbTranslate = global.dbModel.Translate;
        Common = global.common;

        return this;
    },
    //return promise
    sync: ()=> {
        return global.sequelize.sync() // promise
    },
    //promise
    remove: (id)=> {
        var reply = global.models.reply.createInstance();

        //validate
        if (!id) {
            reply
                .setStatus(false)
                .setMessage('not valid');

            if (Common.isFunction(this.callback_error)) {
                this.callback_error(reply);
            }
        }

        //need json.user_id & json.room_id
        return global.dbModel.Translate.destroy({ where: {
            id: id
        }});
    },

    //return promise
    save: function (json) {
        var request,
            reply = global.models.reply.createInstance(),
            _this = this;

        //validate
        if (!json.id) {
            reply
                .setStatus(false)
                .setMessage('not valid');

            if (Common.isFunction(_this.callback_error)) {
                _this.callback_error(reply);
            }
        }

        json['date_create'] = global.common.date.getNow();
        request = this.dbTranslate.build(json);

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
        return this.dbTranslate.findById(id);
    },
    getAll: function () {
        return this.dbTranslate.findAndCountAll();
    },
}

var Translate =  {
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

module.exports = Translate