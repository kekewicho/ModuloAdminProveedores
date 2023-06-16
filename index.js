const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

app.use(session({
  secret: 'SEDUZAC-SECRETKEY',
  resave: false,
  saveUninitialized: true
}));


//Iniciando base de datos
mongoose.connect('mongodb://127.0.0.1:27017/SEDUZAC')
  .then(() => {
    console.log('Conexión a la base de datos exitosa')
  })
  .catch(() => {
    console.log('Ocurrió un error al intentar conectar con la base de datos')
  })


app.set('view engine', 'ejs');
app.use(express.static('public'));
//Configuración para envio de formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//Inicializando el esquema de la base de datos
const proveedoresSchema = new mongoose.Schema({
  regimen: { type: String, required: true },
  primerApellido: { type: String, required: false },
  segundoApellido: { type: String, required: false },
  nombre: { type: String, required: false },
  fechaNacimiento: { type: String, required: false },
  rfc: { type: String, required: false },
  razonSocial: { type: String, required: true },
  fechaConstitucion: { type: String, require: false },
  cedulaProveedor: { type: String, require: false },
  representanteLegal: { type: String, require: false },
  tipoCalle: { type: String, require: false },
  nombreCalle: { type: String, require: false },
  noExterior: { type: String, require: false },
  noInterior: { type: String, require: false },
  tipoAsentamiento: { type: String, require: false },
  nombreAsentamiento: { type: String, require: false },
  cp: { type: String, require: false },
  entidad: { type: String, require: false },
  municipio: { type: String, require: false },
  localidad: { type: String, require: false },
  email: { type: String, require: false },
  telefono: { type: String, require: false },
  giro: { type: String, require: false },
  tyc: { type: String, require: false },
  status: { type: String, require: false },
}, { collection: 'Proveedores' }, { timestamps: true });

const usuariosSchema = new mongoose.Schema({
  user: { type: String, require: true },
  password: { type: String, require: true },
  role: { type: String, require: true },
}, { collection: 'Usuarios' }, { timestamps: true });

const Usuarios = mongoose.model('Usuarios', usuariosSchema)
const Proveedores = mongoose.model('Proveedores', proveedoresSchema)


// Rutas de acceso

app.get('/', (req, res) => {
  res.redirect("/login");
});

app.get('/login', (req, res) => {
  res.render('login', {
    pageTitle: 'Login'
  });
});

app.get('/success', (req, res) => {
  res.render('success', {
    pageTitle: 'Registro exitoso'
  });
});

app.get('/administracion', requireLogin, (req, res) => {
  solicitudesPendientes = Proveedores.find({ "status": 'pendiente' }, 'rfc razonSocial giro entidad status')
    .then(data => {
      console.log(data)
      res.render('panelAdministracion', {
        pageTitle: 'Administración',
        solicitudesPendientes: data,
      });
    });
})

app.get('/registro', (req, res) => {
  res.render('registro', {
    pageTitle: 'Registro'
  });
})

app.get('/editarRegistro/:rfc', (req, res) => {
  const rfc = req.params.rfc;
  Proveedores.findOne({ 'rfc': rfc })
  .then(data => {
    console.log(data)
    res.render('editar', {
      pageTitle: 'Inspeccionar | Editar',
      data:data,
    });
  });
})

// Endpoints auxiliares

app.post('/submitLogin', async (req, res) => {
  const formData = req.body;
  const passwordDB = await Usuarios.findOne({ 'user': formData.usuario }, 'password');

  console.log(formData.contraseña == passwordDB.password);

  if (formData.contraseña === passwordDB.password) {
    req.session.loggedIn = true;
    res.send({ 'status': 'success' });
  } else {
    res.send({ 'status': 'error' });
  }
});

app.post('/submitRegistro', async (req, res) => {
  const registro = req.body;
  registro.status='pendiente'
  registro.razonSocial=registro.nombre+" "+registro.primerApellido+" "+registro.segundoApellido
  Proveedores.create(registro)
    .then(resultado => {
      console.log("Proveedor registrado con éxito")
      res.redirect('/success')
    })
    .catch(error => {
      console.log('Error en el registro:' + error)
    })
});

function requireLogin(req, res, next) {
  if (req.session.loggedIn) {
    // El usuario ha iniciado sesión, permitir el acceso a la siguiente ruta
    next();
  } else {
    // El usuario no ha iniciado sesión, redirigir al formulario de inicio de sesión
    res.redirect('/login');
  }
}

app.post('/queryProveedor', async (req, res) => {
  const rfc = req.body.rfc;

  Proveedores.findOne({ 'rfc': rfc }, 'rfc razonSocial giro entidad status')
    .then(data => {
      if (!data) {
        // Si no se encontró ningún proveedor
        res.send({
          'status': 'no encontrado'
        });
      } else {
        // Si se encontró el proveedor
        res.send({
          'status': 'encontrado',
          'data': data
        });
      }
    })
    .catch(error => {
      // Manejar errores en la consulta
      res.send({
        'status': 'error',
        'message': error.message
      });
    });
});

// Iniciar el servidor
const port = 3000;

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
