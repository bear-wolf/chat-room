'use strict';

module.exports = {
    dbProfile: null,

    init: function () {
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
    save: function (json) {
        var p;

        if (json.id) {
            p = this.dbProfile.update(json, {where: { id: json.id } })
        } else {
            p = this.dbProfile.create(json);
        }

        return p;
    },
    getById: function (id) {
        return this.dbProfile.findById(id);
    },
    getAll: function () {
        return this.dbProfile.findAndCountAll();
    },
}