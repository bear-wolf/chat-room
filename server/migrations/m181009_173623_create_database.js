var modelMigration = require('./migrate/model/migration-model');
var config = require('./../config');

var _public = {
    constructor: function () {

        return this;
    },
    up: function () {
        var nameDb = config.database.database;
        delete config.database.database;

        this.database_name = 'chat-room';
        this.setQuery('CREATE SCHEMA '+ this.getDataBaseName()+'')
            .setCallBackAfterQuery( function (data) {
                config.database.database = nameDb;
                console.log('Migration is successful.');
            })
            .runQuery();
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

