var express = require('express');
var router = express.Router();

var max_length= 70;
router.get('/', function(req, res, next) {

  getNavbarData()
      .spread(function(areas, servicios, becas, fondos, turnos){
        for( var i=0; i< areas.length; i++){
          if(areas[i].descripcion.length > max_length)
            areas[i].descripcion =
                areas[i].descripcion.substr(0, max_length)+ ' ...';
        }
        res.render('index',
            { title: 'Oficina de Bienestar Universitario',
              servicios: servicios, areas:areas, becas: becas,
              fondos: fondos, turnos:turnos });
      })
});

router.get('/bienestar-saludable', function(req, res, next) {


  getNavbarData()
      .spread(function(areas, servicios, becas, fondos,turnos){
         return [areas, servicios, becas , fondos , turnos,
           models.Area.findOne({
             where:{id: 1},
             include: [models.Servicio, models.FondoApoyo, models.Beca]
           })]
      })
      .spread(function(areas, servicios, becas, fondos, turnos, area){
        for( var i=0; i< area.Servicios.length; i++){
          if(area.Servicios[i].descripcion.length > max_length)
            area.Servicios[i].descripcion =
                area.Servicios[i].descripcion.substr(0, max_length)+ ' ...';
        }
        for( var j=0; j< area.Becas.length; j++){
          if(area.Becas[j].beneficios.length > max_length)
            area.Becas[j].beneficios =
                area.Becas[j].beneficios.substr(0, max_length)+ ' ...';
        }
        for( var k=0; k< area.FondoApoyos.length; k++){
          if(area.FondoApoyos[k].beneficios.length > max_length)
            area.FondoApoyos[k].beneficios =
                area.FondoApoyos[k].beneficios.substr(0, max_length)+ ' ...';
        }
        res.render('nodo_area',
            { title: 'Oficina de Bienestar Universitario',
              servicios: servicios, area:area, areas:areas, becas: becas,
              fondos: fondos, turnos:turnos});
      })




});

router.get('/bienestar-psicologico', function(req, res, next) {

  getNavbarData()
      .spread(function(areas, servicios, becas, fondos, turnos){
        return [areas, servicios, becas , fondos , turnos,
          models.Area.findOne({
            where:{id: 2},
            include: [models.Servicio, models.FondoApoyo, models.Beca]
          })]
      })
      .spread(function(areas, servicios, becas, fondos, turnos, area){
        for( var i=0; i< area.Servicios.length; i++){
          if(area.Servicios[i].descripcion.length > max_length)
            area.Servicios[i].descripcion =
                area.Servicios[i].descripcion.substr(0, max_length)+ ' ...';
        }
        for( var j=0; j< area.Becas.length; j++){
          if(area.Becas[j].beneficios.length > max_length)
            area.Becas[j].beneficios =
                area.Becas[j].beneficios.substr(0, max_length)+ ' ...';
        }
        for( var k=0; k< area.FondoApoyos.length; k++){
          if(area.FondoApoyos[k].beneficios.length > max_length)
            area.FondoApoyos[k].beneficios =
                area.FondoApoyos[k].beneficios.substr(0, max_length)+ ' ...';
        }

        res.render('nodo_area',
            { title: 'Oficina de Bienestar Universitario',
              servicios: servicios, area:area, areas:areas, becas: becas,
              fondos: fondos, turnos:turnos});
      })
      .catch(function(err){

        res.sendStatus(503);
      })

});

router.get('/bienestar-social', function(req, res, next) {

  getNavbarData()
      .spread(function(areas, servicios, becas, fondos, turnos){
        return [areas, servicios, becas , fondos , turnos,
          models.Area.findOne({
            where:{id: 3},
            include: [models.Servicio, models.FondoApoyo, models.Beca]
          })]
      })
      .spread(function(areas, servicios, becas, fondos,turnos, area){
        for( var i=0; i< area.Servicios.length; i++){
          if(area.Servicios[i].descripcion.length > max_length)
            area.Servicios[i].descripcion =
                area.Servicios[i].descripcion.substr(0, max_length)+ ' ...';
        }
        for( var j=0; j< area.Becas.length; j++){
          if(area.Becas[j].beneficios.length > max_length)
            area.Becas[j].beneficios =
                area.Becas[j].beneficios.substr(0, max_length)+ ' ...';
        }
        for( var k=0; k< area.FondoApoyos.length; k++){
          if(area.FondoApoyos[k].beneficios.length > max_length)
            area.FondoApoyos[k].beneficios =
                area.FondoApoyos[k].beneficios.substr(0, max_length)+ ' ...';
        }
        res.render('nodo_area',
            { title: 'Oficina de Bienestar Universitario',
              servicios: servicios, area:area, areas:areas, becas: becas,
              fondos: fondos,turnos:turnos });
      })

});

router.get('/servicios/:id',function(req,res){

  getNavbarData()
      .spread(function(areas, servicios, becas, fondos, turnos){
        return [areas, servicios, becas , fondos , turnos,
          models.Servicio.findOne({
            where:{id: req.params.id},
            include: [models.Area, models.Turno, models.Trabajador]
          })]
      })
      .spread(function(areas, servicios, becas, fondos, turnos, servicio){
        res.render('nodo_servicio',
            { title: 'Oficina de Bienestar Universitario',
              servicios: servicios, servicio:servicio, areas:areas, becas: becas,
              fondos: fondos, turnos:turnos });
      })
});

router.get('/becas/:id',function(req,res){

  getNavbarData()
     .spread(function(areas, servicios, becas, fondos, turnos){
       return [areas, servicios, becas , fondos , turnos,
         models.Beca.findOne({
           where:{id: req.params.id},
           include: [models.Area]
         })]
     })
      .spread(function(areas, servicios, becas, fondos, turnos, beca){
        res.render('nodo_beca',
            { title: 'Oficina de Bienestar Universitario',
              servicios: servicios, beca:beca, areas:areas, becas: becas,
              fondos: fondos, turnos:turnos});
      })
});

router.get('/fondos-de-apoyo/:id',function(req,res){


  getNavbarData()
      .spread(function(areas, servicios, becas, fondos, turnos){
        return [areas, servicios, becas , fondos , turnos,
          models.FondoApoyo.findOne({
            where:{id: req.params.id},
            include: [models.Area]
          })]
      })
      .spread(function(areas, servicios, becas, fondos, turnos, fondo){
        res.render('nodo_fondo',
            { title: 'Oficina de Bienestar Universitario',
              servicios: servicios, fondo:fondo, areas:areas, becas: becas,
              fondos: fondos, turnos:turnos });
      })
});

router.get('/turnos/:id',function(req,res){


  getNavbarData()
      .spread(function(areas, servicios, becas, fondos, turnos){
        return [areas, servicios, becas , fondos , turnos,
          models.Turno.findOne({
            where:{id: req.params.id},
            include: [models.Servicio]
          })]
      })
      .spread(function(areas, servicios, becas, fondos, turnos, turno){

        for( var i=0; i< turno.Servicios.length; i++){
          if(turno.Servicios[i].descripcion.length > max_length)
            turno.Servicios[i].descripcion =
                turno.Servicios[i].descripcion.substr(0, max_length)+ ' ...';
        }


        res.render('nodo_turno',
            { title: 'Oficina de Bienestar Universitario',
              servicios: servicios, turno:turno, areas:areas, becas: becas,
              fondos: fondos, turnos:turnos});
      })
});

function getNavbarData(){

  return models.Area.findAll({})

      .then(function(areas){
        return [areas, models.Servicio.findAll({})]
      })
      .spread(function(areas, servicios) {

        return [areas, servicios, models.Beca.findAll({})];
      })
      .spread(function(areas, servicios, becas){
        return [areas, servicios, becas, models.FondoApoyo.findAll({})]
      })
      .spread(function(areas, servicios, becas, fondos){
        return [areas, servicios, becas, fondos,
          models.Turno.findAll({ order: 'id'})]
      })

}

module.exports = router;
