const express = require('express');
const app = express();
const sequelize = require('./database/db');
const BD = require('./database/models/User');
var cors = require('cors');

// Setting
const PORT = process.env.PORT || 3000;


//cors
app.use(cors());

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


// Rutas
app.get('/', function (req, res) {

    BD.create({
        name: "OK",
        birthday: new Date(1999, 4, 6)
    }).then(user => {
        res.json(user);
    });

    // User.findAll().then(users => {
    //     res.json(users);
    // });

});
app.get('/chuchoapi/crea', function (req, res) {

    BD.create({
        nombre: "Pepe",
        telefono: "8116360604"
    }).then(user => {
        res.json(user);
    });
});

app.get('/chuchoapi/muestra', function (req, res) {

    BD.findAll().then(users => {
        res.json(users);
    });

});

app.get("/chuchoapi/TelefonoOne/:id", (req, res) => {
    console.log(req.params.id);
    BD.findOne({
      where:{
        telefono: req.params.id
      }
      
    })
      .then(data => {
        res.json({
          id: data.id,
          nombre: data.nombre, 
          ap_paterno:data.ap_paterno,
          ap_materno: data.ap_materno,
          telefono: data.telefono,
          password:data.password,
          status:"EXITO"
        })
      }).catch(function (err) {
        res.json({
            status: "ERROR"
          })
      });;  
  });

  app.get("/chuchoapi/ClavePass/:id", (req, res) => {
    console.log(req.params.id);
    BD.findOne({
      where:{
        password: req.params.id
      }
    })
      .then(data => {
        res.json({
          id: data.id,
          nombre: data.nombre, 
          ap_paterno:data.ap_paterno,
          ap_materno: data.ap_materno,
          telefono: data.telefono,
          password:data.password,
          status:"EXITO"
        })
      }).catch(function (err) {
        res.json({
            status: "ERROR"
          })
      });;
    
  
  });


// Arrancamos el servidor
app.listen(PORT, function () {
    console.log(`La app ha arranado en http://localhost:${PORT}`);

    // Conectase a la base de datos
    // Force true: DROP TABLES
    sequelize.sync({ force: false }).then(() => {
        console.log("Nos hemos conectado a la base de datos");
    }).catch(error => {
        console.log('Se ha producido un error', error);
    })

});