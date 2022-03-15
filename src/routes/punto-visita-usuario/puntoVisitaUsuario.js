const express = require('express');
const connection = require('../../conection');
const router = express.Router();

//eliminar puntos visita usuario seleccionado por el usuario
router.delete('/visit-point-user/:puntoVisitaUsuarioId', (req, res) => {
    const { puntoVisitaUsuarioId } = req.params;
    const query = `DELETE FROM puntos_visita_usuario WHERE id= ${puntoVisitaUsuarioId}`;

    connection.query(query, (err) => {
      if(!err) {
        res.json({status: 'puntos visita usuario eliminado'});
      } else {
        console.log(err);
      }
    });
});

module.exports = router;