const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

const userRouter = require('./routes/usuario/usuario');
const autenticacionRouter = require('./routes/autenticacion/autenticacion');
const lugaresRouter = require('./routes/lugares/lugares');
const puntosVisitaRouter = require('./routes/puntos-visita/puntosVisita');
const puntoVisitaUsuarioRouter = require('./routes/punto-visita-usuario/puntoVisitaUsuario');

// Middlewares
app.use(express.json());

//Rutas
app.use([userRouter,autenticacionRouter,lugaresRouter,puntoVisitaUsuarioRouter,puntosVisitaRouter]);

app.get('/',(req, res) => {

  //listar todas las rutas registradas
  var route, routes = [];
  app._router.stack.forEach(function(middleware){
      if(middleware.route){ // routes registered directly on the app
          routes.push(middleware.route.path);
      } else if(middleware.name === 'router'){ // router middleware 
          middleware.handle.stack.forEach(function(handler){
              route = handler.route;
              route && routes.push(route.path);
          });
      }
  });

  res.json({
    routes: routes
  });
});

//Server listen
app.listen(PORT, ()=>{
    console.log(`listen on port ${PORT}`)
});