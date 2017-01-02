module.exports = function(sequelize, DataTypes) {
  var Trabajador = sequelize.define("Trabajador", {

    nombre: { type: DataTypes.STRING, allowNull: false},
    apellido: { type: DataTypes.STRING, allowNull: false},
    cargo: { type: DataTypes.STRING, allowNull: false},
    especialidad: { type: DataTypes.STRING, allowNull: false}

  }, {

    classMethods: {
      associate: function(models) {
        Trabajador.belongsToMany(models.Servicio,{through: models.TrabajadorServicio});
      }
    }
  });

  return Trabajador;
};