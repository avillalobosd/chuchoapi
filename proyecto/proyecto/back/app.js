const express = require('express');
const app = express();
const sequelize = require('./database/db');
const BD = require('./database/models/User');
var cors = require('cors');
const Seq=require('sequelize')
const fileUpload = require('express-fileupload');
const path = require('path');
// Setting
const PORT = process.env.PORT || 4000;
const Op = Seq.Op;
app.use(fileUpload());
//cors
app.use(cors());

var whitelist = ['http://localhost:3000', '*']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(express.json());
app.use(express.static(__dirname+'public'));
// app.use('/static',express.static(__dirname+'/public'));
// app.use(express.static(path.join(__dirname,'public')));
// app.use('/static', express.static(path.join(__dirname, '/public')));
// var publicDir = require('path').join(__dirname,'/public'); 
// app.use(express.static(publicDir)); 


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
    nombre: "Jesús Manuel",
    ap_paterno: "Ortiz",
    ap_materno: "Morales",
    no_emp: "00000",
    sexo: "Masculino",
    municipio: "García",
    escuela: "SNTE",
    region: "1",
    telefono: "8116360604",
    activojubilado: "activo",
    nivel: "Primaria",
    foto: "http://",
    referido: 0,
    agregados: 0,
    verificado: true

  }).then(user => {
    { }
    res.json(user);
  });
});

app.get('/chuchoapi/muestra', function (req, res) {

  BD.findAll().then(users => {
    res.json(users);
  });

});


app.get('/chuchoapi/referidos/:id', function (req, res) {

  BD.findAll({
    where: {
      referido: req.params.id
    },order: [
      ['nombre', 'ASC'],
  ]
  }).then(users => {
    res.json(users);
  });
});

app.get('/chuchoapi/muestraHijos/:idPadre', function (req, res) {

  BD.findAll({
    where: {
      cadena: {
        [Op.like]: req.params.idPadre+'%'
      }
    }
  }).then(users => {
    res.json(users);
  });
});
// BUSCA EL TELEFONO EN LA BASE DE DATOS 
app.get("/chuchoapi/TelefonoOne/:id", (req, res) => {
  console.log(req.params.id);
  BD.findOne({
    where: {
      telefono: req.params.id
    }

  })
    .then(data => {
      res.json({
        id: data.id,
        nombre: data.nombre,
        ap_paterno: data.ap_paterno,
        ap_materno: data.ap_materno,
        telefono: data.telefono,
        password: data.password,
        status: "EXITO"
      })
    }).catch(function (err) {
      res.json({
        status: "ERROR"
      })
    });;
});

// BUSCA EL NO_EMPLEADO EN LA BASE DE DATOS 
app.get("/chuchoapi/NoEmpleado/:id", (req, res) => {
  console.log(req.params.id);
  BD.findOne({
    where: {
      no_emp: req.params.id
    }

  })
    .then(data => {
      res.json({
        id: data.id,
        nombre: data.nombre,
        ap_paterno: data.ap_paterno,
        ap_materno: data.ap_materno,
        telefono: data.telefono,
        password: data.password,
        no_emp: data.no_emp,
        status: "EXITO"
      })
    }).catch(function (err) {
      res.json({
        status: "ERROR"
      })
    });;
});


app.put("/chuchoapi/registrar", (request, res) => {
  BD.create({
    nombre: request.body.nombre,
    ap_paterno: request.body.ap_paterno,
    ap_materno: request.body.ap_materno,
    no_emp: request.body.no_emp,
    // no_emp: "FL0021",
    sexo: request.body.sexo,
    municipio: request.body.municipio,
    escuela: request.body.escuela,
    region: request.body.region,
    telefono: request.body.telefono,
    activojubilado: request.body.activojubilado,
    nivel: request.body.nivel,
    foto: request.body.foto,
    password: request.body.password,
    referido: request.body.referido,
    agregados: 0,
    verificado: false,
    cadena:request.body.cadena,
    hijos:false
  }).then(data => {
    res.json({
      status: "EXITO"
    })
  }).catch(function (err) {
    res.json({
      status: "ERROR",
      error: err
    })
  });;
})

app.put("/chuchoapi/sumarTodos", (request, res) => {
  BD.update({
    agregados: sequelize.literal('agregados +1')},{  where: {
      id: 1
  }} )

//   BD.increment({agregados: 1}, {  where: {
//     id: {
//         $in: request.body.sumar
//     }
// }})

})

app.put("/chuchoapi/foto", (request, res) => {
  if (request.files === null) {
    return res.json({ msg: 'No file uploaded' });
  }

  const file = request.files.file;

  file.mv(`${__dirname}/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});

// BUSCA LA CONTRESEÑA EN LA BASE DE DATOS 
app.get("/chuchoapi/ClavePass/:id", (req, res) => {
  console.log(req.params.id);
  BD.findOne({
    where: {
      password: req.params.id
    }
  })
    .then(data => {
      res.json({
        id: data.id,
        nombre: data.nombre,
        ap_paterno: data.ap_paterno,
        ap_materno: data.ap_materno,
        telefono: data.telefono,
        password: data.password,
        municipio: data.municipio,
        escuela: data.escuela,
        region: data.region,
        activojubilado: data.activojubilado,
        nivel: data.nivel,
        foto: data.foto,
        agregados: data.agregados,
        status: "EXITO",
        hijos:data.hijos,
        cadena:data.cadena
      })
    }).catch(function (err) {
      res.json({
        status: "ERROR"
      })
    });;


});

// SUMA 1 A AGREGADOS 
app.get("/chuchoapi/suma/:id", (req, res) => {
  console.log(req.params.id);
  BD.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      var suma=data.agregados+1
      
      BD.update({agregados:suma}, {
        where: {
          id: req.params.id
        }
      })
      res.json({status:"OK"})
    }).catch(function (err) {
      res.json({
        status: "ERROR"
      })
    });;


});

app.get("/chuchoapi/hijos/:id", (req, res) => {
  BD.update({hijos:true}, {
    where: {
      id: req.params.id
    }
  }).then(function (dbUser) {
    res.json({mensaje:"ACTUALIZADO HIJO"})
  })
    .catch(function (err) {
      console.log(err)
      console.log(err)
      res.json({mensaje:"NO ACTUALIZADO HIJO"})
    })
})


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