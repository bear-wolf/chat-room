global.config = require('./config/index');

global.getControllers = function () {
    //return require('./controllers/');
    return require('./controllers/');
}

// // так выглядит подключение других стандартных модулей, например:
// demandLoad(global, 'fs', 'fs');
// demandLoad(global, 'path', 'path');
// demandLoad(global, 'url', 'url');