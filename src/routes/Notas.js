const express = require('express'); 
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res)=>{
    res.render('notas/add');
});

// agregar nota a la base de datos
router.post('/add', async (req, res)=>{
    const {title, description} = req.body;
    const newNota = {
        title,
        description
    };
    await pool.query('INSERT INTO notas set ?', [newNota]);
    req.flash('success', 'Nota agregada Satisfactoriamente');
    res.redirect('/notas');    
});

// consulta a la base de datos y mostrar todas las notas
router.get('/', async (req, res)=>{    
    const notas = await pool.query('SELECT * FROM notas');
    res.render('notas/list', {notas});
});

// eliminar
router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
   await pool.query('DELETE FROM notas WHERE ID= ?', [id]);
   req.flash('success', 'Nota eliminada Satisfactoriamente');
   res.redirect('/notas');  
});

// editar a la formulario de la vista
router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const notas = await pool.query('SELECT * FROM notas WHERE id=?', [id]);
   res.render('notas/edit', {notas: notas[0]});
});

// guardar el formulario editado en la base de datos
router.post('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const {title, description} = req.body;
    const newNota = {title, description};
    await pool.query('UPDATE notas set ? WHERE id = ?', [newNota, id]);
    req.flash('success', 'Nota actualizada Satisfactoriamente');
    res.redirect('/notas');    
});





module.exports = router;