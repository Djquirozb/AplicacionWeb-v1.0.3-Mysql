const express = require('express');
const router = express.Router();
const passport = require('passport');
const pool = require('../database');
const helpers = require('../lib/helpers')
const {EstaLogeado, NoEstaLogeado} = require('../lib/auth');



// vista de registro
router.get('/signup', NoEstaLogeado, (req, res) => {
    res.render('registro/signup')
});

// registro
router.post('/registro/signup', NoEstaLogeado, async (req, res) => {
    const errors = [];
    const { name, email, password, confirm_password } = req.body; // recibir los datos de los formularios
    if (password != confirm_password) { // este es un filtro de que las contraseñas coinciden
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) { // este es un filtro de longitud
        errors.push({ text: 'la contraseña debe contener al menos 4 caracteres' });
    }
    if (errors.length > 0) { // condicional o filtro que si no hay errores renderiza a esta pagina. 
        res.render('registro/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        });

    } else {
        const emailUser = await pool.query('SELECT * FROM users where email =?', [email]); // esta es una funcion asincrona, una vez devueva la busqueda, lo que debuelva se guarda en una constante llamada emailUser       
        if (emailUser.length > 0) {
            req.flash('error_msg', 'el email escrito ya esta en uso'); // con  flash mandamos un error describiendo q ya esta en uso.
            res.redirect('/signup');


        } else { // condicion de crear nuevo usuario si no esta el correo repetido en la base de datos.
            const newUser = { name, email, password };
            newUser.password = await helpers.encryptPassword(password)
            const result = await pool.query('INSERT INTO users SET ?', [newUser]);
            console.log(result)
            req.flash('success', 'Tu Registro Se realizo Satisfactoriamente');
            res.redirect('/signin');
        }
    }

});

// ingreso a la aplicacion
router.get('/signin', NoEstaLogeado, (req, res) => {
    res.render('registro/signin');
});

router.post('/signin', NoEstaLogeado, passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}));

// salir de la aplicacion.
router.get('/logout', EstaLogeado, (req, res) => {
    req.logOut();
    res.redirect('/signin');
});

// ruta perfil 
router.get('/profile', EstaLogeado, (req, res) => {
    res.render('profile');
});



module.exports = router;