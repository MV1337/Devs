const {Sequelize} = require("sequelize")

const sequelize = new Sequelize('sistemadecadastro', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log('Conectamos com sucesso!!!')
} catch (error) {
    console.log('Infelizmente foi econtrado um erro!' + error)
}



module.exports = sequelize