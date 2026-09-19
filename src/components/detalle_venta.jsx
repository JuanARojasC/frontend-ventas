import { useEffect, useState } from 'react';
import api from '../services/api';

function DetalleVenta() {
  const [detalles, setDetalles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/detalle-venta')
      .then(response => {
        setDetalles(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('Error al cargar los detalles de venta');
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando detalles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
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
          {detalles.map(d => (
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