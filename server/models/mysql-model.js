var _public = {
    database_name: null,
    connection: null, // connection to database
    query: null,
    callback_successfully: null,
    callback_error: null,
    db: null,

    constructor: function () {
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

    setDataBase: function (instance) {
        this.db = instance;

        return this;
    },

    runQuery: function () {
        var _this = this;

        this.db.setCallBackConnection(function () {
            _this.db.getConnection().query(_this.query, function (err, data) {
                if (err) {
                    if (typeof _this.callback_error == "function")
                        _this.callback_error(err);
                    return;
                }
                _this.callback_successfully(data);

                _this.db.connectionClose();
            });
        })
        .connect();
    },
}

var Mysql = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return Mysql.instance = new Obj().constructor();
    },
    save: function (user) {
        return this;
    },
    remove: function (user) {
        return this;
    },
    getInstance: function () {
        return Role.instance;
    }
}

module.exports = Mysql;