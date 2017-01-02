module.exports = function(sequelize, DataTypes) {
  var Servicio = sequelize.define("Servicio", {

    nombre: { type: DataTypes.STRING, allowNull: false},
    descripcion: { type: DataTypes.TEXT, allowNull: false},
    imagen:{ type: DataTypes.STRING, allowNull: true}
  }, {
    classMethods: {
      associate: function(models) {
        Servicio.belongsTo(models.Area);
        Servicio.belongsToMany(models.Trabajador,{through: models.TrabajadorServicio});
        Servicio.belongsToMany(models.Turno,{through: models.ServicioTurno});


      }
    }
  });

  return Servicio;
};