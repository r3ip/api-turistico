const express = require('express');
const connection = require('../../conection');
const router = express.Router();


//listar puntos de visita asociados a un usuario
router.get('/visit-point/:usuarioId', (req, res) => {
    const { usuarioId } = req.params;
    const query = `SELECT pvu.id as puntoVisitaUsuarioId, pv.id as puntoVisitaId, pv.nombre, pv.descripcion, pv.imagen, pv.costo
    FROM usuario u 
    INNER JOIN puntos_visita_usuario pvu on u.id = pvu.usuarioId 
    INNER JOIN puntos_visita
    WHERE u.id = ${usuarioId}`

    connection.query(query, (err, results) =>{
        if (err) throw error;
        res.json(results);
    })
});

//crear punto de visita
router.post('/visit-point/add', (req, res) => {
    const { nombre, descripcion, imagen, costo} = req.body;
    const query = 'INSERT INTO puntos_visita SET ?';

    connection.query(query, [nombre, descripcion, imagen, costo], (err) => {
      if(!err) {
        res.json({status: 'punto de visita registrado'});
      } else {
        console.log(err);
      }
    });
});

//actualizar punto de visita
router.put('/visit-point/updated/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, imagen, costo } = req.body;
    const query = `UPDATE puntos_visita SET nombre = '${nombre}', descripcion = '${descripcion}', imagen = '${imagen}',
    costo = '${costo}' WHERE id =${id}`;

    connection.query(query, (err) => {
      if(!err) {
        res.json({status: 'punto de visita actualizado'});
      } else {
        console.log(err);
      }
    });
});

//registrar puntos visita seleccionados por el usuario
const registrarPunto = (usuarioId, puntoVisitaId) => {
    const query = 'INSERT INTO puntos_visita_usuario SET ?';

    connection.query(query, [usuarioId, puntoVisitaId], (err) => {
      if(!err) {
        res.json({status: 'punto visita usuario registrado'});
      } else {
        console.log(err);
      }
    });
}

module.exports = router;