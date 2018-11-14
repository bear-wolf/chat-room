var redis = require("redis");

var Redis = {
    client: null,

    init: function () {
        this.client = redis.createClient();

        this.client.on("error", function (err) {
            console.log("Error " + err);
        });

        return this;
    },
    setData: function (key, value) {
        if (!value) return false;

        this.client.set(key, JSON.stringify(value));

        return true;
    },
    getData: function (key, callback) {
        this.client.get(key, function (error, data) {
            if (error) {
                console.log(error);
                callback({
                    status: false,
                    message: error
                });
            }
            callback(null, JSON.parse(data));
        });
    },
    removeData: function (key, callback) {
        this.client.del(key, function (error, data) {
            callback(error, data);
            return false;
        });
        return this;
    },
}

module.exports = Redis.init();