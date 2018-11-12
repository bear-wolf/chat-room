require('./sequelize');
require('./install')

module.exports = {
    User: require('./models/user').init(),
    Profile: require('./models/profile'),
    Participant: require('./models/participant'),
    Room: require('./models/room').init(),
    Role: require('./models/role'),
    Message: require('./models/message')
}