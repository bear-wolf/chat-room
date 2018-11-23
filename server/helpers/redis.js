var redis = require("redis");

var Redis = {
    client: null,
    data : {},
    enable: global.config.switchRedis,

    init: function () {
        if (!this.enable) {
            return this;
        }

        this.client = redis.createClient();

        this.client.on("error", function (err) {
            console.log("Error " + err);
        });

        return this;
    },
    setData: function (key, value) {
        if (!value) return false;

        if (!this.enable) {
            this.data[key] == JSON.stringify(value);
        }
        else {
            this.client.set(key, JSON.stringify(value));
        }

        return true;
    },
    getData: function (key, callback) {
        if (!this.enable) {
            var value = this.data[key] ? JSON.parse(this.data[key]) : '{}';

            callback(null, JSON.parse(value));
            return this;
        }

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
        if (!this.enable) {
            delete this.data[key];
            callback(null, {});
            return this;
        }

        this.client.del(key, function (error, data) {
            callback(error, data);
            return false;
        });
        return this;
    },
}

module.exports = Redis.init();