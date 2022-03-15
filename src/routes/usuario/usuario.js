const express = require('express');
const connection = require('../../conection');
const router = express.Router();

//listar todos usuarios (ejemplo)
// router.get('/user', (req, res) => {
//     const query = 'SELECT * FROM usuario WHERE status = 1'

//     connection.query(query, (err, results) =>{
//         if (err) throw error;
//         res.json(results);
//     })
// });

//listar usuario (ejemplo)
// router.get('/user/:id', (req, res) => {
//     const { id } = req.params;
//     const query = `SELECT * FROM usuario WHERE status = ${id} and status = 1`

//     connection.query(query, (err, results) =>{
//         if (err) throw error;
//         res.json(results);
//     })
// });

//crear usuario
router.post('/user/add', (req, res) => {
    const { nombre, email, password} = req.body;
    const query = 'INSERT INTO usuario SET ?';

    connection.query(query, [nombre, email, password], (err) => {
      if(!err) {
        res.json({status: 'usuario registrado'});
      } else {
        console.log(err);
      }
    });
});

//actualizar usuario
router.put('/user/updated/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, password} = req.body;
    const query = `UPDATE usuario SET nombre = '${nombre}', email = '${email}', password = '${password}' WHERE id =${id}`;

    connection.query(query, (err) => {
      if(!err) {
        res.json({status: 'usuario actualizado'});
      } else {
        console.log(err);
      }
    });
});

//eliminar usuario(ejemplo)
// router.delete('/user/:id', (req, res) => {
//     const { id } = req.params;
//     const query = `DELETE FROM usuario WHERE id= ${id}`;

//     connection.query(query, (err) => {
//       if(!err) {
//         res.json({status: 'usuario eliminado'});
//       } else {
//         console.log(err);
//       }
//     });
// });

//eliminar usuario(ejemplo)
router.put('/user/deleted/:id', (req, res) => {
    const { id } = req.params;
    const query = `UPDATE usuario SET status = 2 WHERE id = ${id}`;

    connection.query(query, (err) => {
      if(!err) {
        res.json({status: 'usuario eliminado'});
      } else {
        console.log(err);
      }
    });
});

module.exports = router;