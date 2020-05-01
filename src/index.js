const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path'); 
const flash = require ('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport')


const {database} = require('./keys');

// initializations
const app = express();
require('./lib/passport');



// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main', // esta es la ruta de la plantilla principal de la aplicacion
        layoutsDir: path.join(app.get('views'), 'layouts'), // esto es para que concadene la ruta con views
        partialsDir: path.join(app.get('views'), 'partials'), // todos los archivos guardados en partials, podemos llamarlos de manera general
        extname: '.hbs', // esto es para definir la configuracion del motor de las vistas
        helpers: require('./lib/handlebars')
    }));
app.set('view engine', '.hbs');


// middlewares es un software que se sitúa entre un sistema operativo y las aplicaciones que se ejecutan en él
app.use(session({
    secret: 'mysqlnodejs',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize()); // el middlewares, tiene que ir despues de session por el usa sus recursos
app.use(passport.session());
app.use(flash());

// Global Variables, variables globales hay que definirlas rutas
app.use((req, res, next)=> {
    app.locals.success = req.flash('success');
    res.locals.error_msg =req.flash('error_msg');
    res.locals.error =req.flash('error');
    res.locals.user = req.user || null;
    next();
});


// Routes, rutas
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/Notas' ,require('./routes/Notas'));

// publicas
app.use(express.static(path.join(__dirname, 'public')));



// servidor escucha
app.listen(app.get('port'), () => {
console.log('server on port:', app.get('port'));
});

