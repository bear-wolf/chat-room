var User = global.sequelize.define('User', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,

    },
    password: Sequelize.DataTypes.STRING,
    role_id: Sequelize.DataTypes.INTEGER,
    profile_id: Sequelize.DataTypes.INTEGER,
    date_create: Sequelize.DataTypes.DATE,
    date_update: Sequelize.DataTypes.DATE,
});

var Profile = global.sequelize.define('Profile', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        // foreignKey: true,
        // references: {
        //     model: 'User',
        //     key: 'profile_id'
        // }
    },
    first_name: Sequelize.DataTypes.STRING,
    last_name: Sequelize.DataTypes.STRING,
    picture: Sequelize.DataTypes.STRING,
    middle_name: Sequelize.DataTypes.STRING,
    date_create: Sequelize.DataTypes.DATE,
    date_update: Sequelize.DataTypes.DATE
});

//Profile.belongsTo(User, {foreignKey: 'profile_id'}); // Adds profile_id to User

var Role =  global.sequelize.define('Role', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        // references: {
        //     model: 'Users',
        //     key: 'id'
        // }
    },
    status: Sequelize.DataTypes.INTEGER,
    description: Sequelize.DataTypes.STRING,
    date_create: Sequelize.DataTypes.DATE,
    date_update: Sequelize.DataTypes.DATE
});

// Role.belongsTo(User, {foreignKey: 'role_id'}); // Adds role_id to User

var Room =  global.sequelize.define('Room', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        // references: {
        //     model: 'Users',
        //     key: 'id'
        // }
    },
    title: Sequelize.DataTypes.STRING,
    user_id: Sequelize.DataTypes.INTEGER,
    role_id: Sequelize.DataTypes.INTEGER,
    date_create: Sequelize.DataTypes.DATE,
    date_update: Sequelize.DataTypes.DATE
});

// Room.belongsTo(User, {foreignKey: 'user_id'}); // Adds profile_id to User

var Participant =  global.sequelize.define('Participant', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        // foreignKey: true,
        // references: {
        //     model: 'User',
        //     key: 'id'
        // }
    },
    room_id: {
        type: Sequelize.DataTypes.INTEGER,
        // foreignKey: true,
        // references: {
        //     model: 'User',
        //     key: 'id'
        // }
    },
    role_id: {
        type: Sequelize.DataTypes.INTEGER,
        // foreignKey: true,
        // references: {
        //     model: 'User',
        //     key: 'id'
        // }
    },
    date_create: Sequelize.DataTypes.DATE,
    date_update: Sequelize.DataTypes.DATE
});

// Participant.belongsTo(User, {foreignKey: 'user_id'}); // Adds profile_id to User

var Message =  global.sequelize.define('Message', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    owner_id: {
        type: Sequelize.DataTypes.INTEGER,
    },
    participant_id: {
        type: Sequelize.DataTypes.INTEGER,
    },
    status: {
        type: Sequelize.DataTypes.INTEGER,
    },
    description: {
        type: Sequelize.DataTypes.STRING,
    },
    date_create: Sequelize.DataTypes.DATE,
    date_update: Sequelize.DataTypes.DATE
});

var PrivateRoom =  global.sequelize.define('PrivateRoom', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    owner_id: {
        type: Sequelize.DataTypes.INTEGER,
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
    },
    role_id: {
        type: Sequelize.DataTypes.INTEGER,
    },
    date_create: Sequelize.DataTypes.DATE,
    date_update: Sequelize.DataTypes.DATE
});



var Translate =  global.sequelize.define('Translate', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    key: {
        type: Sequelize.DataTypes.STRING,
    },
    value_en: {
        type: Sequelize.DataTypes.STRING,
    },
    value_ru: {
        type: Sequelize.DataTypes.STRING,
    },
    value_ua: {
        type: Sequelize.DataTypes.STRING,
    },
    date_create: Sequelize.DataTypes.DATE,
    date_update: Sequelize.DataTypes.DATE
});

global.sequelize.sync();

global.dbModel = {
    User: User,
    Profile: Profile,
    Role: Role,
    Room: Room,
    PrivateRoom: PrivateRoom,
    Participant: Participant,
    Message: Message,
    Translate: Translate,

    getModelByKey: function (key) {
        return this[key];
    }
}
