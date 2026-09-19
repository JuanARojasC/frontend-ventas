import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/menu';
import Clientes from './components/clientes';
import Productos from './components/productos';
import Ventas from './components/ventas';
import DetalleVenta from './components/detalle_venta';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<h2>Bienvenido al Sistema</h2>} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/detalle-venta" element={<DetalleVenta />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;