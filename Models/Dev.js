const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const User = require('./User')

const Dev = db.define('Dev', {
    devweb: {
        type: DataTypes.STRING,
        require: true,
    },
    level: {
        type: DataTypes.STRING,
        allowNull: false
    },
    technologies: {
        type: DataTypes.STRING,
        require: true,
    },
    experience: {
        type: DataTypes.TEXT,
        require: true
    },
})

Dev.belongsTo(User)
User.hasMany(Dev)


module.exports = Dev
