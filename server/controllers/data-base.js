var mysqlModel = require('./../models/mysql-model');

var _private = {

}

var _public = {
    callback_connection: null,
    connection: null,

    constructor: function () {
        this.database_name = global.config.getDataBaseName();

        this.connection = global.mysql.createConnection(global.config.getDataBase());

        return this;
    },
    getDataBaseName: function () {
        return this.database_name;
    },
    setCallBackConnection: function (callback_connection) {
        this.callback_connection = callback_connection;

        return this;
    },
    getConnection: function() {
        return this.connection;
    },
    connect: function () {
        var _this = this;

        this.connection.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            if (typeof _this.callback_connection == "function") {
                _this.callback_connection.call(this);
            }
        });
    },
    connectionClose: function () {
        this.connection.end();
    },
    getModel: function () {
        var instance = mysqlModel.createInstance();

        instance.setDataBase(this);

        return instance;
    },
}
var DataBase = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return DataBase.instance = new Obj().constructor();
    },
    getInstance: function () {
        return DataBase.instance;
    }
}

module.exports = DataBase;