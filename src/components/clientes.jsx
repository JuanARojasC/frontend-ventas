import { useEffect, useState } from 'react';
import api from '../services/api';

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [nuevoCliente, setNuevoCliente] = useState({
    nomcliente: '',
    contacto: '',
    departamento: '',
    ciudad: ''
  });

  const cargarClientes = () => {
    api.get('/clientes')
      .then(response => {
        setClientes(response.data);
        setCargando(false);
      })
      .catch(err => {
        setError('Error al cargar la lista de clientes');
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const manejarCambio = (e) => {
    setNuevoCliente({ ...nuevoCliente, [e.target.name]: e.target.value });
  };

  const crearCliente = async (e) => {
    e.preventDefault();
    try {
      await api.post('/clientes', nuevoCliente);
      setNuevoCliente({ nomcliente: '', contacto: '', departamento: '', ciudad: '' });
      cargarClientes();
    } catch (err) {
      alert('Error al crear el cliente');
    }
  };

  if (cargando) return <p>Cargando clientes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Registrar Nuevo Cliente</h2>
      <form onSubmit={crearCliente} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input type="text" name="nomcliente" placeholder="Nombre" value={nuevoCliente.nomcliente} onChange={manejarCambio} required />
        <input type="text" name="contacto" placeholder="Contacto" value={nuevoCliente.contacto} onChange={manejarCambio} required />
        <input type="text" name="departamento" placeholder="Departamento" value={nuevoCliente.departamento} onChange={manejarCambio} required />
        <input type="text" name="ciudad" placeholder="Ciudad" value={nuevoCliente.ciudad} onChange={manejarCambio} required />
        <button type="submit">Guardar Cliente</button>
      </form>

      <h2>Listado de Clientes</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Departamento</th>
            <th>Ciudad</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(clientes) && clientes.map(c => (
            <tr key={c.id_cliente}>
              <td>{c.id_cliente}</td>
              <td>{c.nomcliente}</td>
              <td>{c.contacto}</td>
              <td>{c.departamento}</td>
              <td>{c.ciudad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clientes;
