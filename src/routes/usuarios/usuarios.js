const express = require('express');
const connection  = require('../../conection');
const router = express.Router();

router.get('/users', (req, res) => {
    const sql = 'SELECT * FROM usuarios'
    connection.query(sql, (err, results) =>{
        if (err) throw error;
        res.json(results);
    })
});

module.exports = router;