require('./sequelize');
require('./install')

module.exports = {
    User: require('./models/user').init(),
    Profile: require('./models/profile'),
}