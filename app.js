require('dotenv').config();
var express = require('express');
const cors = require('cors');
var db = require('./db');

var app = express();

app.use(cors());
app.use(express.json());

app.get('/clientes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clientes');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/productos', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/ventas', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM ventas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/detalle-venta', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM detalle_venta');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- RUTAS PARA PRODUCTOS ---

// Editar producto
app.put('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nomproducto, cantidad, precio } = req.body;
    
    // Ejecutamos el UPDATE en PostgreSQL
    await db.query(
      'UPDATE productos SET nomproducto = $1, cantidad = $2, precio = $3 WHERE id_producto = $4',
      [nomproducto, cantidad, precio, id]
    );
    
    res.json({ message: 'Producto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar producto
app.delete('/productos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Ejecutamos el DELETE en PostgreSQL
    await db.query('DELETE FROM productos WHERE id_producto = $1', [id]);
    
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;