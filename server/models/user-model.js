var _private = {
    insert: function (callback) {
        var db = global.getControllers().DataBase.createInstance();

        var template = 'INSERT INTO `'+ db.getDataBaseName() +'`.`User` (`email`, `password`, `role_id`, `profile_id`, ' +
            '`date_create`, `date_update`) VALUES ("{0}", "{1}", "{2}", "{3}", "{4}", "{5}"';
debugger;
        template =
            template.replace('{0}', this.email)
            template.replace('{1}', this.password)
            template.replace('{2}', this.role_id)
            template.replace('{3}', this.profile_id)
            template.replace('{4}', this.date_create)
            template.replace('{5}', this.date_update)

        db
            .getModel()
            .setQuery(template)
            .setCallBackSuccessfully(callback)
            .runQuery()
    },
    update: function () {
        
    }
};

var _public = {
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

    save: function () {
        var _this = this;
         debugger;
        if (this.id) {
            _private.update.call(this, function (data) {
                debugger;
                _this.responce.end(JSON.stringify({
                    status : true,
                }));
            });
        } else {
            _private.insert.call(this)
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
        }

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