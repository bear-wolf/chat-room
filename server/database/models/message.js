'use strict';

module.exports = {
    dbMessage: null,

    init: function () {
        this.dbMessage = global.dbModel.Profile;

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
            p = this.dbMessage.update(json, {where: { id: json.id } })
        } else {
            p = this.dbMessage.create(json);
        }

        return p;
    },
    getById: function (id) {
        return this.dbMessage.findById(id);
    },
    getAll: function () {
        return this.dbMessage.findAndCountAll();
    },
}