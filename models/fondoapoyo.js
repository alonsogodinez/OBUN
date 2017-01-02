module.exports = function(sequelize, DataTypes) {
  var FondoApoyo = sequelize.define("FondoApoyo", {

    nombre: { type: DataTypes.STRING, allowNull: false},
    beneficios:{ type: DataTypes.TEXT, allowNull: false},
    requisitos: { type: DataTypes.TEXT, allowNull: false},
    modalidad_atencion:{ type: DataTypes.STRING, allowNull: false},
    imagen:{ type: DataTypes.STRING, allowNull: true}
  }, {
    classMethods: {
      associate: function(models) {
        FondoApoyo.belongsTo(models.Area);
      }
    }
  });

  return FondoApoyo;
};