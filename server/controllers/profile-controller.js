var ProfileController, _public, _private;

_public = {
    constructor: function () {
        this.super();

        return this;
    }
}

ProfileController = {
    createInstance : function(){
        var Obj = function(){
            for(var key in _public){
                this[key] = _public[key];
            }
        }
        Obj.prototype = Object.create(global.getControllers().BaseController.createInstance());

        return new Obj().constructor();

    },
}


module.exports = ProfileController;