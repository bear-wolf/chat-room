var modelMigration = require('./migrate/model/migration-model');
require('./../dependencies');

var _public = {
    constructor: function () {

        return this;
    },
    up: function () {
        this.setQuery('CREATE TABLE `'+this.getDataBaseName()+'`.`migration` ('+
            '`version` VARCHAR(100) NOT NULL, ' +
            '`timestamp` INT NULL)')
            .setCallBackSuccessfully( function (data) {
                console.log('Migration is successful.');
            })
            .setCallBackError(function (error) {
                console.log('Error:', error);
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

