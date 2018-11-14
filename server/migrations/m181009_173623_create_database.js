var modelMigration = require('./migrate/model/migration-model');
require('./../dependencies');

var _public = {
    constructor: function () {

        return this;
    },
    up: function () {
        var _this = this,
            nameDb = config.database.database;
        delete config.database.database;

        this.setQuery('CREATE DATABASE `'+ this.getDataBaseName()+'`')
            .setCallBackSuccessfully( function (data) {
                //config.database.database = nameDb;
                console.log('Migration is successful.');
            })
            .setCallBackError(function (error) {
                console.log('Error:', error);
            })
            .runQuery();
    },

    addMigrateTable: function () {
        this.setQuery('CREATE TABLE `'+this.getDataBaseName()+'`.`migration` ('+
                    '`version` VARCHAR(100) NULL,' +
                    '`timestamp` INT NULL,' +
                    'PRIMARY KEY (`version`))')
            .setCallBackSuccessfully( function (data) {
                debugger;
                console.log('Migration is successful.');
            })
            .setCallBackError(function (error) {
                console.log('Error:', error);
            })
            .runQuery();

      return this;
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

