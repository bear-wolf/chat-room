require('./../../../dependencies');

var _public = {
    database_name: null,
    connection: null, // connection to database
    query: null,
    callback_after_query: null,
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
    setCallBackAfterQuery: function (callback_after_query) {
        this.callback_after_query = callback_after_query;

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
                this.getConnection().query(_this.query, function (err, data) {
                    if (err) {
                        if (typeof _this.callback_error == "function")
                        _this.callback_error();
                        return;
                    }
                    _this.callback_after_query(data);

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