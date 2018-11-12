'use strict';

module.exports = {
    dbParticipant: null,

    init: function () {
        this.dbParticipant = global.dbModel.Profile;

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
    save: function (json) {
        var p;

        if (json.id) {
            p = this.dbParticipant.update(json, {where: { id: json.id } })
        } else {
            p = this.dbParticipant.create(json);
        }

        return p;
    },
    getById: function (id) {
        return this.dbParticipant.findById(id);
    },
    getAll: function () {
        return this.dbParticipant.findAndCountAll();
    },
}