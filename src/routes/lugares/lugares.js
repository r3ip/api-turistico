const express = require('express');
const connection = require('../../conection');
const router = express.Router();


//listar lugares asociados a un punto de visita
router.get('/sites/:puntoVisitaId', (req, res) => {
    const { puntoVisitaId } = req.params;
    const query = `SELECT l.id as lugarId, l.nombre, l.descripcion, l.lat, l.lon, l.status
    FROM my_db.puntos_visita pv 
    INNER JOIN my_db.puntos p on pv.id = p.puntoVisitaId 
    INNER JOIN my_db.lugares l on p.lugaresId = l.id
    WHERE pv.id = ${puntoVisitaId} AND l.status = 1`

    connection.query(query, (err, results) =>{
        if (err) throw error;
        res.json(results);
    })
});

//crear lugar
router.post('/sites/add', (req, res) => {
    const { nombre, descripcion, imagen, lat, lon, status, puntoVisitaId} = req.body;
    const query = 'INSERT INTO lugares SET ?';

    connection.query(query, [nombre, descripcion, imagen, lat, lon, status], (err, result) => {
      if(!err) {
        res.json({status: 'lugar registrado'});
        registrarPunto(puntoVisitaId, result.insertId);
      } else {
        console.log(err);
      }
    });
});

//actualizar lugares
router.put('/sites/updated/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagen, lat, lon, status } = req.body;
    const query = `UPDATE lugares SET nombre = '${nombre}', descripcion = '${descripcion}', imagen = '${imagen}',
    lat = '${lat}', lon = '${lon}' WHERE id =${id}`;

    connection.query(query, (err) => {
      if(!err) {
        res.json({status: 'lugar actualizado'});
      } else {
        console.log(err);
      }
    });
});

//eliminar lugares
router.put('/sites/deleted/:id', (req, res) => {
    const { id } = req.params;
    const query = `UPDATE lugares SET status = 2 WHERE id = ${id}`;

    connection.query(query, (err) => {
      if(!err) {
        res.json({status: 'lugar eliminado'});
      } else {
        console.log(err);
      }
    });
});

//registrar punto del lugar asociado a un punto de visita
const registrarPunto = (puntoVisitaId, lugarId) => {
    const query = 'INSERT INTO puntos SET ?';

    connection.query(query, [puntoVisitaId, lugarId], (err) => {
      if(!err) {
        res.json({status: 'punto registrado'});
      } else {
        console.log(err);
      }
    });
}

module.exports = router;