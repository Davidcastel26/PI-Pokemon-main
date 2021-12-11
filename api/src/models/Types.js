const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{
    sequelize.define('type',{
        id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}

/**
 [ ] Tipo con las siguientes propiedades:
    ID
    Nombre

 */