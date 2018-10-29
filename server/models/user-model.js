var commonModel = require('./common-model');
var _public, self;

self = {

    setCallBackSuccessfully: function (callback_successfully) {
        this.callback_successfully = callback_successfully;

        return this;
    },
    setCallBackError: function (callback_error) {
        this.callback_error = callback_error;

        return this;
    },



    insert: function () {
        var template,
            db = global.getControllers().DataBase.createInstance();

        template = 'INSERT INTO `'+ db.getDataBaseName() +'`.`User` (`email`, `password`, `date_create`) VALUES ("{0}", "{1}", "{2}")'

        template = template.replace('{0}', this.email)
            .replace('{1}', this.password)
            .replace('{2}', this.date_create)

        db
            .getModel()
            .setQuery(template)
            .setCallBackSuccessfully(this.callback_successfully)
            .setCallBackError(this.callback_error)
            .runQuery()
    },
    update: function () {

    },
    _getByPermission: function () {
        var template,
            db = global.getControllers().DataBase.createInstance();

        template = 'SELECT User.* FROM `'+ db.getDataBaseName() +'`.`User` WHERE `User`.`email` = "{0}" && `User`.`password` = "{1}"';

        template =
            template.replace('{0}', this.email)
            .replace('{1}', this.password)

        db
            .getModel()
            .setQuery(template)
            .setCallBackSuccessfully(this.callback_successfully)
            .setCallBackError(this.callback_error)
            .runQuery()

        return this;
    },
};


_public = {
    id: null,
    role_id: null,
    profile_id: null,
    date_create: null,
    email: null,
    password: null,

    constructor: function () {
        return this;
    },

    setId: function (id) {
        this.id = id || null;

        return this;
    },
    setRoleId: function (role_id) {
        this.role_id = role_id || null;

        return this;
    },
    setProfileId: function (profile_id) {
        this.profile_id = profile_id || null;

        return this;
    },

    setEmail: function (email) {
        this.email = email || null;

        return this;
    },

    setPassword: function (password) {
        this.password = password || null;

        return this;
    },

    isValidate: function () {

        return true;
    },
    getByPermission: function () {
        self.setCallBackSuccessfully(this.callback_successfully)
        self._getByPermission.call(this);

        return this;
    },

    save: function () {
        var _this = this;

        if (this.id) {
            this.date_update = global.moment().format(this.getConfig().getDateFormat());
            self.update.call(this);
        } else {
            this.date_create = global.moment().format(this.getConfig().getDateFormat());
            self.insert.call(this)
        }
        
        return this;
    },
}

var User = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }

            for(var key in _public){
                self[key] = _public[key];
            }
        }

        Obj.prototype = Object.create(commonModel.getInstance());

        return User.instance = new Obj().constructor();
    },

    remove: function (user) {
        return this;
    },
    getUserByPraticipantId: function (participant_id) {
        return this;
    },
    changeRole: function (role) {
        return this;
    },
    getInstance: function () {
        return User.instance;
    }
}

module.exports = User;