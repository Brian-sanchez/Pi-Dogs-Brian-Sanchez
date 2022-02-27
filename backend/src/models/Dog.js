const { DataTypes } = require('sequelize'); //Con esto traemos las DataTypes de sequelize para poder usarlas
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      primaryKey: true, 
      allowNull: false, 
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height_min:{
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    height_max:{
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    weight_min:{
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    weight_max:{
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    createInBd:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
