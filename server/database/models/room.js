'use strict';

module.exports = {
    dbRoom: null,

    init: function () {
        this.dbRoom = global.dbModel.Room;

        return this;
    },
    //return promise
    sync: ()=> {
        return global.sequelize.sync() // promise
    },
    remove: (id)=> {
        return global.dbModel.Room.destroy({ where: { id: id }});
    },

    //return promise
    save: function (json) {
        var p;

        if (json.id) {
            p = this.dbRoom.update(json, {where: { id: json.id } })
        } else {
            p = this.dbRoom.create(json);
        }

        return p;
    },
    getById: function (id) {
        return this.dbRoom.findById(id);
    },
    getAll: function () {
        return this.dbRoom.findAndCountAll();
    },
}