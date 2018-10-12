var modelMigration = require('./migrate/model/migration-model');
require('./../dependencies');

var _public = {
    constructor: function () {

        return this;
    },
    up: function () {
        var nameDb = config.database.database;
        delete config.database.database;

        // this.setQuery('CREATE DATABASE '+ this.getDataBaseName())
        // //     .setCallBackAfterQuery( function (data) {
        // //         debugger;
        // //         config.database.database = nameDb;
        // //         console.log('Migration is successful.');
        // //     })
        // //     .setCallBackError(function (error) {
        // //         console.log('Error:', error);
        // //     })
        // .runCreateDataBase();

        var con = global.mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
        });

        con.connect(function(err) {
            if (err) throw err;
            this.database_name = 'chat-room';
            con.query("CREATE DATABASE chat-room", function (err, result) {
                if (err) throw err;
                console.log("Database created");
            });
        });
    },
    down: function () {

    }
}

var migration = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }
        Obj.prototype = Object.create(modelMigration.createInstance());

        return new Obj().constructor();

    },
}

migration.createInstance().up();

