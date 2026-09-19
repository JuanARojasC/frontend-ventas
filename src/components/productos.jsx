import { useEffect, useState } from 'react';
import api from '../services/api';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // Estados para manejar la edición
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({ nomproducto: '', cantidad: '', precio: '' });

  // Función para obtener los datos (la separamos para poder reutilizarla al editar)
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

  // --- FUNCIÓN ELIMINAR ---
  const eliminarProducto = async (id) => {
    // Pedimos confirmación antes de borrar
    if (window.confirm('¿Seguro que deseas eliminar este producto?')) {
      try {
        await api.delete(`/productos/${id}`);
        // Actualizamos el estado local filtrando el producto eliminado para no recargar la página
        setProductos(productos.filter(p => p.id_producto !== id)); 
      } catch (err) {
        alert('Error al eliminar el producto');
      }
    }
  };

  // --- FUNCIONES EDITAR ---
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
      setEditandoId(null); // Salimos del modo edición
      cargarProductos(); // Volvemos a pedir los datos a la base de datos para ver los cambios
    } catch (err) {
      alert('Error al actualizar el producto');
    }
  };

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
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
          {productos.map(p => (
            <tr key={p.id_producto}>
              <td>{p.id_producto}</td>
              
              {/* Celda: Nombre */}
              <td>
                {editandoId === p.id_producto ? (
                  <input name="nomproducto" value={formData.nomproducto} onChange={manejarCambio} />
                ) : (
                  p.nomproducto
                )}
              </td>
              
              {/* Celda: Cantidad */}
              <td>
                {editandoId === p.id_producto ? (
                  <input type="number" name="cantidad" value={formData.cantidad} onChange={manejarCambio} />
                ) : (
                  p.cantidad
                )}
              </td>
              
              {/* Celda: Precio */}
              <td>
                {editandoId === p.id_producto ? (
                  <input type="number" name="precio" value={formData.precio} onChange={manejarCambio} />
                ) : (
                  p.precio
                )}
              </td>
              
              {/* Celda: Botones de Acción */}
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