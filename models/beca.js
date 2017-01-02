module.exports = function(sequelize, DataTypes) {
  var Beca = sequelize.define("Beca", {

    nombre: { type: DataTypes.STRING, allowNull: false},
    beneficios:{ type: DataTypes.TEXT, allowNull: false},
    requisitos: { type: DataTypes.TEXT, allowNull: false},
    tipo_beca:{ type: DataTypes.TEXT, allowNull: false},
    imagen:{ type: DataTypes.STRING, allowNull: true}
  }, {
    classMethods: {
      associate: function(models) {
        Beca.belongsTo(models.Area);
      }
    }
  });

  return Beca;
};