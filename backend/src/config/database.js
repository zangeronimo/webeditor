const dbConfig = {
    dialect: 'mariadb',
    host: 'localhost',
    username: 'new_webeditor',
    password: 'new_webeditor',
    database: 'new_webeditor',
    define: {
        timestamps: true,
        underscored: true
    }
}

module.exports = dbConfig;