require('./sequelize');
require('./install')

global.baseModel = require('./models/common');

var db = {
    User: require('./models/user').createInstance(),
    Profile: require('./models/profile').createInstance(),
    Participant: require('./models/participant'),
    Room: require('./models/room').init(),
    Role: require('./models/role'),
    Message: require('./models/message')
}

module.exports = db;