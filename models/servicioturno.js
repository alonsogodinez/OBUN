
module.exports = function(sequelize, DataTypes) {
  var ServicioTurno = sequelize.define("ServicioTurno", {
    //TurnoId    implicitas
    //ServicioId   implicitas
  }, {
    classMethods: {
    }
  });

  return ServicioTurno;
};