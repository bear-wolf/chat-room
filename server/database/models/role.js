'use strict';

module.exports = {
    dbRole: null,

    init: function () {
        this.dbRole = global.dbModel.Profile;

        return this;
    },
    //return promise
    sync: ()=> {
        return global.sequelize.sync() // promise
    },
    remove: (json)=> {
        return this.dbRole.destroy({ where: { id: json.id }});
    },

    //return promise
    save: function (json) {
        var p;

        if (json.id) {
            p = this.dbRole.update(json, {where: { id: json.id } })
        } else {
            p = this.dbRole.create(json);
        }

        return p;
    },
    getById: function (id) {
        return this.dbRole.findById(id);
    },
    getAll: function () {
        return this.dbRole.findAndCountAll();
    },
}