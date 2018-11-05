var modelMigration = require('./migrate/model/migration-model');

var _public = {
    constructor: function () {

        return this;
    },
    up: function () {
        this.setQuery('CREATE TABLE `'+ this.database_name +'`.`Participant`(' +
            '`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,' +
            '`room_id` INT NOT NULL REFERENCES `Room` (id),'+
            '`user_id` INT NOT NULL REFERENCES `User` (id),'+
            '`date_create` DATETIME NOT NULL,' +
            '`date_update` DATETIME NULL)')
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

