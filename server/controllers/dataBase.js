var _private = {

}

var _public = {
    callback_connection: null,

    constructor: function () {
        this.connection = global.mysql.createConnection(config.getDataBase());

        return this;
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
                _this.callback_connection.call(_this);
            }
        });
    },
    connectionClose: function () {
        this.connection.end();
    }
}
var DataBase = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }

        return new Obj().constructor();
    }
}

module.exports = DataBase;