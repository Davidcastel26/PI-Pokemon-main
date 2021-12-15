const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    attack:{
      type: DataTypes.INTEGER
    },
    defense:{
      type: DataTypes.INTEGER
    },
    speed:{
      type: DataTypes.INTEGER
    },
    height:{
      type: DataTypes.INTEGER
    }, 
    weight:{
      type: DataTypes.INTEGER
    },
    img:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },{
    timestamps: true,
    createdAt: 'Created',
    updatedAt: 'Updated'
  })
};


/*

[ ] Pokemon con las siguientes propiedades:
------ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
------Nombre *
------Vida  (CALLED AS HP)
------Fuerza
------Defensa
------Velocidad
------Altura
------Peso


*/