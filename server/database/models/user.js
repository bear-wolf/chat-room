'use strict';

module.exports = {
    dbUser: null,

    init: function () {
        this.dbUser = global.dbModel.User;

        return this;
    },
    remove: (json)=> {
        return this.dbUser.destroy({ where: { id: json.id }});
    },

    //return promise
    save: function (json) {
        var p;

        if (json.id) {
            p = this.dbUser.update(json, {where: { id: json.id } })
        } else {
            p = this.dbUser.create(json);
        }

        return p;
    },
    getByPermission: function (json) {
        return this.dbUser.findOne(json, {where: { email: json.email, password: json.password } });
    },
}