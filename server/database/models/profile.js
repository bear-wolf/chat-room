'use strict';

var _private = {
    addProfileInUser: function (id, user_id, callback) {
        var modelUser = global.db.User,
            reply = global.models.reply.createInstance();

        modelUser
            .save({
                id: user_id,
                profile_id: id
            })
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
                callback(reply.get());
            });
    }
}

var _public = {
    dbProfile: null,

    constructor: function () {
        this.dbProfile = global.dbModel.Profile;

        return this;
    },
    //return promise
    sync: ()=> {
        return global.sequelize.sync() // promise
    },
    remove: (json)=> {
        return this.map().destroy({ where: { id: json.id }});
    },

    //return promise
    save: function (bodyRequest, id) {
        var request,
            reply = global.models.reply.createInstance(),
            _this = this;


        if (id) {
            bodyRequest['date_update'] = global.common.date.getNow();

            request = this.dbProfile.update(bodyRequest, {
                where: {id: Number(id)},
                returning: false
            });
        } else {
            bodyRequest['date_create'] = global.common.date.getNow();
            request = this.dbProfile.build(bodyRequest).save();
        }

        request
            .then((data, arg)=>{
                if (!id) {
                    //new profile
                    _private.addProfileInUser(data.dataValues.id, bodyRequest.user_id, function (_data) {
                        //callback
                        reply
                            .setStatus(true)
                            .setMessage('You change profile is successfully')
                            .setData(data.dataValues);

                        _this.callback_successfully(reply);
                    });
                } else {
                    reply
                        .setStatus(true)
                        .setMessage('You save profile is successfully')
                        .setData(data.dataValues);

                    _this.callback_successfully(reply);
                }
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setMessage(error.message);

                _this.callback_error(reply);
            });

        return this;
    },
    getById: function (id) {
        return this.dbProfile.findByPk(id);
    },
    //return promise
    getAll: function () {
        return this.dbProfile.findAll();
    },
}

var ProfileModel = {
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

module.exports = ProfileModel;