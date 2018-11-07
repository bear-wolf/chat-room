'use strict';

module.exports = {
    user: null,

    init: function () {
        this.map();

        return this;
    },
    map: ()=>{
        var Sequelize = global.Sequelize;

        this.user = global.sequelize.define('User', {
            email: Sequelize.DataTypes.TEXT,
            password: Sequelize.DataTypes.TEXT,
            role_id: Sequelize.DataTypes.INTEGER,
            profile_id: Sequelize.DataTypes.INTEGER,
            date_create: Sequelize.DataTypes.DATE,
            date_update: Sequelize.DataTypes.DATE,
        });

        //FOREIGHT KEY
        // references: {
        //     // This is a reference to another model
        //     model: Bar,
        //
        //         // This is the column name of the referenced model
        //         key: 'id',
        //
        //         // This declares when to check the foreign key constraint. PostgreSQL only.
        //         deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        // }

        return this.user;
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
    getByPermission: function (json) {
        return this.map().findOne(json, {where: { email: json.email, password: json.password } });
    },
}