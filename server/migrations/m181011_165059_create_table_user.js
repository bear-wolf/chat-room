var modelMigration = require('./model/migration-model');

var _public = {
    constructor: function () {

        return this;
    },
    up: function () {
        this.setQuery('CREATE TABLE `'+ this.database_name +'`.`User` (\n' +
            '  `id` INT NOT NULL,\n' +
            '  `profile_id` INT NULL,\n' +
            '  PRIMARY KEY (`id`));\n')
            .setCallBackAfterQuery( function (data) {
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

