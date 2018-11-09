var modelMigration = require('./migrate/model/migration-model');

var _public = {
    constructor: function () {

        return this;
    },
    up: function () {
        this.setQuery('CREATE TABLE `'+ this.database_name +'`.`Profile`(' +
            '`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,' +
            '`firstName` VARCHAR(50) NOT NULL,'+
            '`lastName` VARCHAR(50) NOT NULL,' +
            '`middleName` VARCHAR(50) NOT NULL,' +
            '`date_create` DATETIME NULL,' +
            '`date_update` DATETIME NULL,' +
            '`userId` INT NOT NULL REFERENCES `User`(id))')
        .setCallBackSuccessfully( function (data) {
            console.log('Migration is successful.');
        })
        .setCallBackError(function (error) {
            console.log(error);
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

