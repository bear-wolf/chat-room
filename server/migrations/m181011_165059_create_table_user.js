var modelMigration = require('./migrate/model/migration-model');

var _public = {
    constructor: function () {

        return this;
    },
    up: function () {
        this.setQuery('CREATE TABLE `'+ this.database_name +'`.`User`(' +
            '`id` INT NOT NULL,' +
            '`email` VARCHAR(50) NOT NULL,'+
            '`password` VARCHAR(50) NOT NULL,' +
            '`role_id` INT NOT NULL,' +
            '`profile_id` INT NULL,' +
            '`date_create` DATETIME,' +
            '`date_update` DATETIME NULL,' +
            ' PRIMARY KEY (`id`))')
        .setCallBackSuccessfully( function (data) {
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

