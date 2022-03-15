const express = require('express');
const connection  = require('../../conection');
const router = express.Router();

router.get('/login', (req, res) => {
    const { email, password } = req.params;
    const query = `SELECT * FROM usuario WHERE us.email = ${email} and us.password = ${password} and us.status = 1`
    
    connection.query(query, (err, results) =>{
        if (err) throw error;
        if(results.length == 1){
            res.json(results);
        }else {
            res.json({ 
                error: 'usuario no encontrado'
            });
        }
    })
});

module.exports = router;