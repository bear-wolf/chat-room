global.config = require('./config/index');
global.mysql = require('mysql');
global.crypto = require("crypto");
global.passport = require('passport');
global.models = require('./models');
global.moment = require('moment');
global.sequelize = require('./config/orm/orm_sequelize');


global.token = require('./helpers/token-helper');
global.redis = require('./helpers/redis');

global.getControllers = function () {
    //return require('./controllers/');
    return require('./controllers/');
}

// // так выглядит подключение других стандартных модулей, например:
// demandLoad(global, 'fs', 'fs');
// demandLoad(global, 'path', 'path');
// demandLoad(global, 'url', 'url');