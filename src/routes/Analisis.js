const express = require('express'); 
const router = express.Router();
const pool = require('../database');
const {EstaLogeado} = require('../lib/auth');


// consulta a la base de datos y mostrar todas las notas
router.get('/', EstaLogeado, async (req, res)=>{    
    
    res.render('analisis/list');
});


// agregar nota a la base de datos
router.post('/add', EstaLogeado, async (req, res)=>{
    const {title, description} = req.body;
    const newNota = {
        title,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO notas set ?', [newNota]);
    req.flash('success', 'Nota agregada Satisfactoriamente');
    res.redirect('/notas');    
});

// eliminar
router.get('/delete/:id', EstaLogeado, async (req, res) => {
    const {id} = req.params;
   await pool.query('DELETE FROM notas WHERE ID= ?', [id]);
   req.flash('success', 'Nota eliminada Satisfactoriamente');
   res.redirect('/notas');  
});

// editar a la formulario de la vista
router.get('/edit/:id', EstaLogeado, async (req, res) => {
    const {id} = req.params;
    const notas = await pool.query('SELECT * FROM notas WHERE id=?', [id]);
   res.render('notas/edit', {notas: notas[0]});
});

// guardar el formulario editado en la base de datos
router.post('/edit/:id', EstaLogeado, async (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;
    const newNota = {title, description};
    await pool.query('UPDATE notas set ? WHERE id = ?', [newNota, id]);
    req.flash('success', 'Nota actualizada Satisfactoriamente');
    res.redirect('/notas');    
});


module.exports = router;