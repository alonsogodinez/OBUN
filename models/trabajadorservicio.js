
module.exports = function(sequelize, DataTypes) {
  var TrabajadorServicio = sequelize.define("TrabajadorServicio", {
    //TurnoId    implicitas
    //ServicioId   implicitas
  }, {
    classMethods: {
    }
  });

  return TrabajadorServicio;
};