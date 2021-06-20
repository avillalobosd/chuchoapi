const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}
User.init({
    nombre: DataTypes.STRING,
    ap_paterno: DataTypes.STRING,
    ap_materno: DataTypes.STRING,
    no_emp: {type: DataTypes.STRING, unique: true},
    sexo: DataTypes.STRING,
    municipio: DataTypes.STRING,
    escuela: DataTypes.STRING,
    region: DataTypes.STRING,
    telefono: {type: DataTypes.STRING, unique: true},
    activojubilado: DataTypes.STRING,
    nivel: DataTypes.STRING,
    foto: DataTypes.STRING,
    primeraVez: {type:DataTypes.BOOLEAN, defaultValue: false}, 
    password: {type:DataTypes.STRING, defaultValue: "0"}, 
    referido: DataTypes.INTEGER,
    agregados: DataTypes.INTEGER,
    verificado: DataTypes.BOOLEAN,
    hijos: {type:DataTypes.BOOLEAN, defaultValue: false},
    cadena: DataTypes.TEXT('long')
    
}, {
    sequelize,
    modelName: "user"
});

module.exports = User;