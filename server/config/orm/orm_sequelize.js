const Sequelize = require('sequelize');
var config =  global.config;

var dbName = config.getDataBaseName();
var dbUser = config.getUser();
var dbPassword = config.getPassword();

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'mysql',
    define: {
        timestamps: false
    }
});

const User = sequelize.define('user', {
    email: Sequelize.DataTypes.TEXT,
    password: Sequelize.DataTypes.TEXT,
    role_id: Sequelize.DataTypes.INTEGER,
    profile_id: Sequelize.DataTypes.INTEGER,
    date_create: Sequelize.DataTypes.DATE,
    date_update: Sequelize.DataTypes.DATE,
});

sequelize.sync()
    .then(function () {
        debugger;
        User.create({
            username: 'janedoe',
            birthday: new Date(1980, 6, 20)
        })
    })
    .then(jane => {
        console.log(jane.toJSON());
    });