require('./../../../dependencies');

var _public = {
    database_name: null,
    connection: null, // connection to database
    query: null,
    callback_successfully: null,
    callback_error: null,

    constructor: function () {
        this.database_name = global.config.getDataBaseName();

        return this;
    },
    setDataBaseName: function (database_name) {
        this.database_name = database_name;

        return this;
    },
    setQuery: function (query) {
        this.query = query;

        return this;
    },
    getDataBaseName: function () {
        return this.database_name;
    },
    setCallBackSuccessfully: function (callback_successfully) {
        this.callback_successfully = callback_successfully;

        return this;
    },
    setCallBackError: function (callback_error) {
        this.callback_error = callback_error;

        return this;
    },

    runQuery: function () {
        var _this = this,
            db = global.getControllers().DataBase.createInstance();

        db.setCallBackConnection(function () {
            db.getConnection().query(_this.query, function (err, data) {
                    if (err) {
                        if (typeof _this.callback_error == "function")
                            _this.callback_error(err);
                        return;
                    }
                    _this.callback_successfully(data);

                    db.connectionClose();
                });
            })
            .connect();
    },
}
var ModelMigration = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }
        
        return new Obj().constructor();
    },
}

module.exports = ModelMigration;