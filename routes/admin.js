var express = require('express');
var router = express.Router();


router.route('/*')
  .all(isAuthenticated);



function isAuthenticated(req,res,next){
  next();
}


router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Administrador' });
});



//AREAS

router.route('/areas/nuevo')
  .get(function(req,res){
      res.render('admin/areas/nueva_area',{title: "Administrador de Contenido"})
    })
  .post(function(req,res){
      models.Area.create({
          nombre: req.body.nombre,
          jefe: req.body.jefe,
          descripcion: req.body.descripcion,
          telefono: req.body.telefono },{})
          .then(function(area_creada){
            res.redirect('/admin/areas');
          })
          .catch(function(err){
            console.log(err);
            res.sendStatus(503);
          });
    });

router.route('/areas')
    .get(function(req,res){
      models.Area.findAll({
        order: 'id',
        include:[models.Servicio]
      })
          .then(function (areas) {
            console.log(areas);
            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.areas =areas;
            res.render('admin/areas/lista_areas',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    });

router.route('/area/:id')
    .get(function(req,res){
      models.Area.findOne({
        where:{id:req.params.id}
      })
          .then(function (area) {
            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.area =area;
            res.render('admin/areas/editar_area',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    })
    .post(function(req,res){
      models.Area.update({
        nombre: req.body.nombre,
        jefe: req.body.jefe,
        descripcion: req.body.descripcion,
        telefono: req.body.telefono
      },{where:{id:req.params.id}}).then(function(){
        res.redirect('/admin/area/'+ req.params.id);
      })
    });

router.route('/area/:id/eliminar')
    .get(function(req,res){

      models.Area.destroy({

        where:{ id:req.params.id }
      })
          .then(function(area_eliminada){
            res.redirect('/admin/areas')
          })


    });
////////////////////////////////////////



//SERVICIOS
router.route('/servicios/nuevo')
    .get(function(req,res){
      res.render('admin/servicios/nuevo_servicio',{title: "Administrador de Contenido"})
    })
    .post(function(req,res){

        models.Servicio.create({

          nombre: req.body.nombre,
          descripcion: req.body.descripcion,
          AreaId: req.body.area_id

        },{})
            .then(function findTurnos(servicio_creado){
              var optns = {};
              optns.where= {id : req.body.turnos_ids};
              return [servicio_creado, models.Turno.findAll(optns)]
            })
            .spread(function addServicioTurno(servicio_creado, turnos){

              return servicio_creado.addTurno(turnos);
            })
            .then(function SuccessCallback(turnos){
              res.redirect('/admin/servicios');
            })
            .catch(function handleErrors(err){
              res.status(503).send(err.name + " "+ err.message);
            });

    });


router.route('/servicios')
    .get(function(req,res){
      models.Servicio.findAll({ include: [models.Turno,models.Area], order: 'id' })
          .then(function (servicios) {
            console.log(servicios);
            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.servicios =servicios;
            res.render('admin/servicios/lista_servicios',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    });

router.route('/servicio/:id')
    .get(function(req,res){
      models.Servicio.findOne({
        where:{id:req.params.id},
        include:[models.Turno, models.Area]
      })
          .then(function (servicio) {
            console.log(servicio);
            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.servicio =servicio;
            res.render('admin/servicios/editar_servicio',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    })
    .post(function(req,res){
      models.Servicio.update({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        AreaId: req.body.area_id
      },{where:{id:req.params.id}}).then(function(){
        res.redirect('/admin/servicio/'+ req.params.id);
      })
    });

router.route('/servicio/:id/eliminar')
    .get(function(req,res){

      models.Servicio.destroy({

        where:{ id:req.params.id }
      })
          .then(function(serivicio_eliminada){
            res.redirect('/admin/servicios')
          })


    });

////////////////////////////////////////

//TODO
//BECAS
router.route('/becas/nueva')
    .get(function(req,res){
      res.render('admin/becas/nueva_beca',{title: "Administrador de Contenido"})
    })
    .post(function(req,res){

      models.Beca.create({
        nombre: req.body.nombre,
        beneficios: req.body.beneficios,
        requisitos: req.body.requisitos,
        tipo_beca: req.body.tipo_beca,
        AreaId : req.body.area_id
    },{}).then(function(beca_creada){
      res.redirect('/admin/becas');
    })
        .catch(function(err){
          console.log(err);
          res.sendStatus(503);
        });
    });

router.route('/becas')
    .get(function(req,res){
      models.Beca.findAll({
        include:[models.Area],
        order: 'id'
      })
          .then(function (becas) {
            console.log(becas);
            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.becas =becas;
            res.render('admin/becas/lista_becas',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    });

router.route('/beca/:id')
    .get(function(req,res){
      models.Beca.findOne({
        where:{id:req.params.id},
        include:[models.Area]
      })
          .then(function (beca) {
            console.log(beca);
            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.beca =beca;
            res.render('admin/becas/editar_beca',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    })
    .post(function(req,res){
      models.Beca.update({
        nombre: req.body.nombre,
        beneficios: req.body.beneficios,
        requisitos: req.body.requisitos,
        tipo_beca: req.body.tipo_beca,
        AreaId : req.body.area_id
      },{where:{id:req.params.id}}).then(function(){
        res.redirect('/admin/beca/'+ req.params.id);
      })
    });

router.route('/beca/:id/eliminar')
    .get(function(req,res){

      models.Beca.destroy({

        where:{ id:req.params.id }
      })
          .then(function(beca_eliminada){
            res.redirect('/admin/becas')
          })


    });




///////////////////////



//TURNOS


router.route('/turnos/nuevo')
    .get(function(req,res){
      res.render('admin/turnos/nuevo_turno',{title: "Administrador de Contenido"})
    })
    .post(function(req,res){
      models.Turno.create({
        nombre: req.body.nombre,
        hora_inicio: req.body.hora_inicio,
        hora_fin: req.body.hora_fin
      },{})
          .then(function(turno_creado){
            res.redirect('/admin/turnos');
          })
          .catch(function(err){
            console.log(err);
            res.sendStatus(503);
          });
    });

router.route('/turnos')
    .get(function(req,res){
      models.Turno.findAll({
        order: 'id'
      })
          .then(function (turnos) {
            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.turnos =turnos;
            res.render('admin/turnos/lista_turnos',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    });

router.route('/turno/:id')
    .get(function(req,res){
      models.Turno.findOne({
        where:{id:req.params.id}
      })
          .then(function (turno) {
            console.log(turno);
            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.turno =turno;
            res.render('admin/turnos/editar_turno',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    })
    .post(function(req,res){
      models.Turno.update({
        nombre: req.body.nombre,
        hora_inicio: req.body.hora_inicio,
        hora_fin: req.body.hora_fin
      },{where:{id:req.params.id}}).then(function(){
        res.redirect('/admin/turno/'+ req.params.id);
      })
    });


router.route('/turno/:id/eliminar')
    .get(function(req,res){

      models.Turno.destroy({

        where:{ id:req.params.id }
      })
          .then(function(turno_eliminado){
            res.redirect('/admin/turnos')
          })


    });

////////////////////////////////////////

//FONDOS
router.route('/fondos/nuevo')
    .get(function(req,res){
      res.render('admin/fondos/nuevo_fondo',{title: "Administrador de Contenido"})
    })
    .post(function(req,res){
      models.FondoApoyo.create({
          nombre: req.body.nombre,
          beneficios: req.body.beneficios,
          requisitos: req.body.requisitos,
          modalidad_atencion: req.body.modalidad_atencion,
          AreaId : req.body.area_id
      },{})
          .then(function(fondo_creado){
            res.redirect('/admin/fondos');
          })
          .catch(function(err){
            console.log(err);
            res.sendStatus(503);
          });
    });

router.route('/fondos')
    .get(function(req,res){
      models.FondoApoyo.findAll({
        include:[models.Area],
        order: 'id'
      })
          .then(function (fondos) {

            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.fondos =fondos;
            res.render('admin/fondos/lista_fondos',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });
    });

router.route('/fondo/:id')
    .get(function(req,res){
      models.FondoApoyo.findOne({
        where:{id:req.params.id},
        include:[models.Area]
      })
          .then(function (fondo) {

            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.fondo =fondo;
            res.render('admin/fondos/editar_fondo',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    })
    .post(function(req,res){
      models.FondoApoyo.update({
        nombre: req.body.nombre,
        beneficios: req.body.beneficios,
        requisitos: req.body.requisitos,
        modalidad_atencion: req.body.modalidad_atencion,
        AreaId : req.body.area_id
      },{where:{id:req.params.id}}).then(function(){
        res.redirect('/admin/fondo/'+ req.params.id);
      })
    });

router.route('/fondo/:id/eliminar')
    .get(function(req,res){

      models.FondoApoyo.destroy({

        where:{ id:req.params.id }
      })
          .then(function(fondo_eliminado){
            res.redirect('/admin/fondos')
          })


    });
////////////////////////////////////////

//TRABAJADORES
router.route('/trabajadores/nuevo')
    .get(function(req,res){
      res.render('admin/trabajadores/nuevo_trabajador',{title: "Administrador de Contenido"})
    })
    .post(function(req,res){
      models.Trabajador.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cargo: req.body.cargo,
        especialidad: req.body.especialidad
        //ServicioId : req.body.servicio_id
      },{})
          .then(function findServicios(trabajador_creado){
            var optns = {};
            optns.where= {id : req.body.servicios_ids};
            console.log(req.body.servicios_ids);
            return [trabajador_creado, models.Servicio.findAll(optns)]
          })
          .spread(function addTrabajadorServicio(trabajador_creado, servicios){
            console.log(servicios.length);
            return trabajador_creado.addServicio(servicios);
          })
          .then(function SuccessCallback(servicios){
            res.redirect('/admin/trabajadores');
          })
          .catch(function handleErrors(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    });

router.route('/trabajadores')
    .get(function(req,res){
      models.Trabajador.findAll({
        include:[models.Servicio],
        order: 'id'
      })
          .then(function (trabajadores) {

            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.trabajadores =trabajadores;
            res.render('admin/trabajadores/lista_trabajadores',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    });

router.route('/trabajador/:id')
    .get(function(req,res){
      models.Trabajador.findOne({
        where:{id:req.params.id},
        include:[models.Servicio]
      })
          .then(function (trabajador) {

            var ctx = {};
            ctx.title ="Administrador de Contenido";
            ctx.trabajador =trabajador;
            res.render('admin/trabajadores/editar_trabajador',ctx);
          })
          .catch(function(err){
            res.status(503).send(err.name + " "+ err.message);
          });

    })
    .post(function(req,res){
      models.Trabajador.update({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cargo: req.body.cargo,
        especialidad: req.body.especialidad,
        ServicioId : req.body.servicio_id
      },{where:{id:req.params.id}}).then(function(){
        res.redirect('/admin/trabajador/'+ req.params.id);
      })
    });

router.route('/trabajador/:id/eliminar')
    .get(function(req,res){

      models.Trabajador.destroy({

        where:{ id:req.params.id }
      })
          .then(function(trabajador_eliminado){
            res.redirect('/admin/trabajadores')
          })


    });
///////////////////////////////////////


module.exports = router;
