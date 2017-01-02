module.exports = function(sequelize, DataTypes) {
  var Turno = sequelize.define("Turno", {
    
    hora_inicio: { type: DataTypes.STRING, allowNull: false},
    hora_fin: { type: DataTypes.STRING, allowNull: false},
    nombre: { type: DataTypes.STRING, allowNull: false}

    
  }, {
    
    classMethods: {
      associate: function(models) {
        Turno.belongsToMany(models.Servicio,{through: models.ServicioTurno});


      }
    }
  });
  
  return Turno;
};