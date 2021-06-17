const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}
User.init({
    nombre: DataTypes.STRING,
    ap_paterno: DataTypes.STRING,
    ap_materno: DataTypes.STRING,
    escuela: DataTypes.STRING,
    region: DataTypes.STRING,
    telefono: {type: DataTypes.STRING, unique: true},
    activo: DataTypes.STRING,
    jubilado: DataTypes.STRING,
    nivel: DataTypes.STRING,
    foto: DataTypes.STRING,
    primeraVez: {type:DataTypes.BOOLEAN, defaultValue: false}, 
    password: DataTypes.STRING,
    referido: DataTypes.INTEGER,
    agregados: DataTypes.INTEGER
    
}, {
    sequelize,
    modelName: "user"
});

module.exports = User;