var MainController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        return this;
    },
    // route '/'
    actionPage: function () {
        var db = global.getControllers().DataBase.createInstance();

        // db
        //     .setCallBackConnection(function (data) {
        //         debugger;
        //         var _this = this;
        //
        //         var sql = "CREATE TABLE customers1 (name VARCHAR(255), address VARCHAR(255))";
        //         this.getConnection().query(sql, function (err, result) {
        //             if (err) throw err;
        //             console.log("Table created");
        //
        //             _this.connectionClose();
        //         });
        //     })
        //     .connect()
    }
}

MainController = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }
        console.log('MainController instance');
        Obj.prototype = Object.create(global.getControllers().BaseController.createInstance());

        return new Obj().constructor();

    },
}


module.exports = MainController;