'use strict';

module.exports = {
    profile: null,

    init: function () {
        this.map();

        return this;
    },
    map: ()=>{
        var Sequelize = global.Sequelize;

        this.profile = global.sequelize.define('Profile', {
            first_name: Sequelize.DataTypes.STRING,
            last_name: Sequelize.DataTypes.STRING,
            middle_name: Sequelize.DataTypes.STRING,
            date_create: Sequelize.DataTypes.DATE,
            date_update: Sequelize.DataTypes.DATE
        });

        // references: {
        //     // This is a reference to another model
        //     model: global.db.User,
        //
        //         // This is the column name of the referenced model
        //         key: 'profile_id',
        //
        //         // This declares when to check the foreign key constraint. PostgreSQL only.
        //         deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        // }

        return this.profile;
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
            p = this.map().update(json, {where: { id: json.id } })
        } else {
            p = this.map().create(json);
        }

        return p;
    },
    getById: function (id) {
        return this.user.findById(id);
    },
    getAll: function () {
        return this.user.findAndCountAll();
    },
}