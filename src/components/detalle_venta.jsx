import { useEffect, useState } from 'react';
import api from '../services/api';

function DetalleVenta() {
  const [detalles, setDetalles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [nuevoDetalle, setNuevoDetalle] = useState({
    id_venta: '',
    id_producto: '',
    cantidad: '',
    precio_unitario: '',
    subtotal: ''
  });

  const cargarDetalles = () => {
    api.get('/detalle-venta')
      .then(response => {
        setDetalles(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('Error al cargar los detalles de venta');
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarDetalles();
  }, []);

  const manejarCambio = (e) => {
    setNuevoDetalle({ ...nuevoDetalle, [e.target.name]: e.target.value });
  };

  const crearDetalle = async (e) => {
    e.preventDefault();
    try {
      await api.post('/detalle-venta', nuevoDetalle);
      setNuevoDetalle({ id_venta: '', id_producto: '', cantidad: '', precio_unitario: '', subtotal: '' });
      cargarDetalles();
    } catch (err) {
      alert('Error al registrar el detalle de venta');
    }
  };

  if (cargando) return <p>Cargando detalles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Registrar Detalle de Venta</h2>
      <form onSubmit={crearDetalle} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input type="number" name="id_venta" placeholder="ID Venta" value={nuevoDetalle.id_venta} onChange={manejarCambio} required />
        <input type="number" name="id_producto" placeholder="ID Producto" value={nuevoDetalle.id_producto} onChange={manejarCambio} required />
        <input type="number" name="cantidad" placeholder="Cantidad" value={nuevoDetalle.cantidad} onChange={manejarCambio} required />
        <input type="number" name="precio_unitario" placeholder="Precio Unitario" value={nuevoDetalle.precio_unitario} onChange={manejarCambio} required />
        <input type="number" name="subtotal" placeholder="Subtotal" value={nuevoDetalle.subtotal} onChange={manejarCambio} required />
        <button type="submit">Guardar Detalle</button>
      </form>

      <h2>Detalle de Ventas</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID Detalle</th>
            <th>ID Venta</th>
            <th>ID Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(detalles) && detalles.map(d => (
            <tr key={d.id_detalle}>
              <td>{d.id_detalle}</td>
              <td>{d.id_venta}</td>
              <td>{d.id_producto}</td>
              <td>{d.cantidad}</td>
              <td>{d.precio_unitario}</td>
              <td>{d.subtotal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetalleVenta;
