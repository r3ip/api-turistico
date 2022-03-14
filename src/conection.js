const mysql = require('mysql2');

// datos para la conecion con la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// conexcion a la base de datos
connection.connect( (err) => {
    if (err) {
        //si ocurrio algun error al conectarse a la base de datos
      console.error(err);
      return;
    } else {
      console.log('db is connected');
    }
  });

// exportamos la conexion para ser usada en cualquier parte del proyecto
module.exports = connection;
