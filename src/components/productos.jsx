import { useEffect, useState } from 'react';
import api from '../services/api';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ nomproducto: '', cantidad: '', precio: '' });
  const [nuevoProducto, setNuevoProducto] = useState({ nomproducto: '', cantidad: '', precio: '' });

  const cargarProductos = () => {
    api.get('/productos')
      .then(response => {
        setProductos(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('Error al cargar la lista de productos');
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarCambioNuevo = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const crearProducto = async (e) => {
    e.preventDefault();
    try {
      await api.post('/productos', nuevoProducto);
      setNuevoProducto({ nomproducto: '', cantidad: '', precio: '' });
      cargarProductos();
    } catch (err) {
      alert('Error al crear el producto');
    }
  };

  const eliminarProducto = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      try {
        await api.delete(`/productos/${id}`);
        setProductos(productos.filter(p => p.id_producto !== id)); 
      } catch (err) {
        alert('Error al eliminar el producto');
      }
    }
  };

  const iniciarEdicion = (producto) => {
    setEditandoId(producto.id_producto);
    setFormData({
      nomproducto: producto.nomproducto,
      cantidad: producto.cantidad,
      precio: producto.precio
    });
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setFormData({ nomproducto: '', cantidad: '', precio: '' });
  };

  const manejarCambio = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const guardarEdicion = async (id) => {
    try {
      await api.put(`/productos/${id}`, formData);
      setEditandoId(null);
      cargarProductos();
    } catch (err) {
      alert('Error al actualizar el producto');
    }
  };

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Registrar Nuevo Producto</h2>
      <form onSubmit={crearProducto} style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input type="text" name="nomproducto" placeholder="Nombre" value={nuevoProducto.nomproducto} onChange={manejarCambioNuevo} required />
        <input type="number" name="cantidad" placeholder="Cantidad" value={nuevoProducto.cantidad} onChange={manejarCambioNuevo} required />
        <input type="number" name="precio" placeholder="Precio" value={nuevoProducto.precio} onChange={manejarCambioNuevo} required />
        <button type="submit">Guardar Producto</button>
      </form>

      <h2>Listado de Productos</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(productos) && productos.map(p => (
            <tr key={p.id_producto}>
              <td>{p.id_producto}</td>
              <td>
                {editandoId === p.id_producto ? (
                  <input name="nomproducto" value={formData.nomproducto} onChange={manejarCambio} />
                ) : (
                  p.nomproducto
                )}
              </td>
              <td>
                {editandoId === p.id_producto ? (
                  <input type="number" name="cantidad" value={formData.cantidad} onChange={manejarCambio} />
                ) : (
                  p.cantidad
                )}
              </td>
              <td>
                {editandoId === p.id_producto ? (
                  <input type="number" name="precio" value={formData.precio} onChange={manejarCambio} />
                ) : (
                  p.precio
                )}
              </td>
              <td>
                {editandoId === p.id_producto ? (
                  <>
                    <button onClick={() => guardarEdicion(p.id_producto)}>Guardar</button>
                    <button onClick={cancelarEdicion}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => iniciarEdicion(p)}>Editar</button>
                    <button onClick={() => eliminarProducto(p.id_producto)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productos;
