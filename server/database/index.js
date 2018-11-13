require('./sequelize');
require('./install')

global.baseModel = require('./models/common');

var db = {
    User: require('./models/user').createInstance(),
    Profile: require('./models/profile').createInstance(),
    Participant: require('./models/participant').createInstance(),
    Room: require('./models/room').createInstance(),
    Role: require('./models/role').createInstance(),
    Message: require('./models/message')
}

module.exports = db;