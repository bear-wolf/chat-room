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
            bodyRequest['date_update'] = global.moment().unix();

            request = this.dbProfile.update(bodyRequest, {where: {id: Number(id)}});
        } else {
            request = this.dbProfile.build(bodyRequest).save();
        }

        request
            .then((data)=>{
                if (!id) {
                    //new profile
                    _private.addProfileInUser(data.dataValues.id, bodyRequest.user_id, function (data) {
                        //callback
                        reply
                            .setStatus(true)
                            .setData(data);

                        _this.callback_successfully(reply.get());
                    });
                } else {
                    reply
                        .setStatus(true)
                        .setData(data);

                    _this.callback_successfully(reply.get());
                }
            })
            .catch((error)=>{
                reply
                    .setStatus(false)
                    .setStatus(false)
                    .setMessage(error);

                _this.callback_error(reply.get());
            });

        return this;
    },
    getById: function (id) {
        return this.dbProfile.findById(id);
    },
    getAll: function () {
        return this.dbProfile.findAndCountAll();
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