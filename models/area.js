
module.exports = function(sequelize, DataTypes) {
  var Area = sequelize.define("Area", {

    nombre: { type: DataTypes.STRING, allowNull: false},
    telefono:{ type: DataTypes.STRING, allowNull: false},
    jefe: { type: DataTypes.STRING, allowNull: false},
    descripcion: { type: DataTypes.TEXT, allowNull: false},
    imagen:{ type: DataTypes.STRING, allowNull: true}
  }, {
    classMethods: {
      associate: function(models) {
        Area.hasMany(models.Servicio);
        Area.hasMany(models.Beca);
        Area.hasMany(models.FondoApoyo);
      }
    }
  });

  return Area;
};