// funcion de loguin de usuario, y confirmacion si esta en la base de datos.
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers')

// passport registro
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE email =?', [email]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);    
        if (validPassword){
            done(null, user, req.flash('success','Welcome'));
        } else {
            done(null, false, req.flash('error_msg','clave incorrecta'));
        } 
    } else {
        return done(null, false, req.flash('error_msg', 'el usuario no existe'));
    }
    
}));

// cosas que passport utiliza para guardar al usuario en la session de nuestro servidor.
passport.serializeUser((user, done) => { // este metodo de passport recibi una funcion
    done(null, user.id); // con esto va a guardar el usuario, con error null y el id del usuario
});

// esta funcion es para deserielizar al usuario, con esta funcion verificamos se el ID tiene autorizacion
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users where id =?', [id]);
    done(null, rows[0]);
});
