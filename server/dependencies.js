global.config = require('./config/index');
global.mysql = require('mysql');
global.redis = require("redis");
global.client = global.redis.createClient();
global.crypto = require("crypto");
global.passport = require('passport');
global.models = require('./models');
global.moment = require('moment');
global.token = require('./helpers/token-helper');

global.getControllers = function () {
    //return require('./controllers/');
    return require('./controllers/');
}

// // так выглядит подключение других стандартных модулей, например:
// demandLoad(global, 'fs', 'fs');
// demandLoad(global, 'path', 'path');
// demandLoad(global, 'url', 'url');