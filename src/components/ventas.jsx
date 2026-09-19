import { useEffect, useState } from 'react';
import api from '../services/api';

function Ventas() {
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [nuevaVenta, setNuevaVenta] = useState({
    id_cliente: '',
    fecha_venta: '',
    total: '',
    estado: ''
  });

  const cargarVentas = () => {
    api.get('/ventas')
      .then(response => {
        setVentas(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('Error al cargar la lista de ventas');
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarVentas();
  }, []);

  const manejarCambio = (e) => {
    setNuevaVenta({ ...nuevaVenta, [e.target.name]: e.target.value });
  };

  const crearVenta = async (e) => {
    e.preventDefault();
    try {
      await api.post('/ventas', nuevaVenta);
      setNuevaVenta({ id_cliente: '', fecha_venta: '', total: '', estado: '' });
      cargarVentas();
    } catch (err) {
      alert('Error al registrar la venta');
    }
  };

  if (cargando) return <p>Cargando ventas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={crearVenta} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input type="number" name="id_cliente" placeholder="ID Cliente" value={nuevaVenta.id_cliente} onChange={manejarCambio} required />
        <input type="date" name="fecha_venta" value={nuevaVenta.fecha_venta} onChange={manejarCambio} required />
        <input type="number" name="total" placeholder="Total" value={nuevaVenta.total} onChange={manejarCambio} required />
        <input type="text" name="estado" placeholder="Estado (Ej: Pagado)" value={nuevaVenta.estado} onChange={manejarCambio} required />
        <button type="submit">Guardar Venta</button>
      </form>

      <h2>Listado de Ventas</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>ID Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(ventas) && ventas.map(v => (
            <tr key={v.id_venta}>
              <td>{v.id_venta}</td>
              <td>{v.id_cliente}</td>
              <td>{v.fecha_venta}</td>
              <td>{v.total}</td>
              <td>{v.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Ventas;
