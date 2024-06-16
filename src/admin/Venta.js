import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../CartContext';
import { PersonaService } from '../PersonaAPI';

function Ventas() {
  const [usuarios, setUsuarios] = useState([]);
  const [vendedorId, setVendedorId] = useState('');
  const [venta, setVentas ] = useState([]);
  const [products, setproduct] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [montoPagado, setMontoPagado] = useState('');
  const [estadoPago, setEstadoPago] = useState('');
  const [pagoCompleto, setPagoCompleto] = useState(false);
  const [pagoParcial, setPagoParcial] = useState(false);
  const personaService = new PersonaService();

  useEffect(() => {
    personaService.getUser().then(data => {
      setUsuarios(data);
    }).catch(error => {
      console.error("Error fetching usuarios:", error);
    });

    personaService.getProducto().then(data => {
      setproduct(data);
    }).catch(error => {
      console.error("Error fetching usuarios:", error);
    });

    personaService.getVentas().then(data => {
      setVentas(data);
    }).catch(error => {
      console.error("Error fetching ventas:", error);
    });
  }, [personaService, setVentas, setUsuarios, setproduct]);

  const handleRealizarVenta = async (e) => {
    e.preventDefault();

    const productosVenta = products.map(producto => ({
      id: products.id,  // Aquí debes cambiar por el campo id correcto del producto
      cantidad: products.cantidad, // Ajusta según cómo manejes la cantidad
      precioUnitario: products.precioUnitario  // Ajusta según cómo obtengas el precio unitario
    }));

    const cantidad = products.reduce((acc, products) => acc + 1, 0);
    const total = products.reduce((acc, products) => acc + 1 * products.precioUnitario, 0);

    const ventaData = {
      vendedorId,
      clienteId,
      productos: JSON.stringify(productosVenta),
      cantidad,
      total,
      montoPagado: parseFloat(montoPagado),
      estadoPago
    };

    try {
      personaService.realizarVenta(ventaData);
      console.log('Venta realizada:', ventaData);
      setVentas([...venta, ventaData]);
      setVendedorId('');
      setClienteId('');
      setproduct([]);
      setMontoPagado('');
      setEstadoPago('');
      console.log('Venta realizada:');
    } catch (error) {
      console.error('Error al realizar la venta:', error);
      // Aquí podrías manejar el error
    }
  };

  return (
    <div>
      <h2>Realizar Venta</h2>
      <form onSubmit={handleRealizarVenta}>
        <div className="form-group">
          <label>Vendedor</label>
          <select
            value={vendedorId}
            onChange={(e) => setVendedorId(e.target.value)}
          >
            <option value=""> Seleccione un Vendedor</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Cliente</label>
          <select
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value=""> Seleccione un Cliente</option>
            {usuarios.map(usuario => (
              <option key={usuario.id} value={usuario.id}>{usuario.nombre}</option>
            ))}
          </select>
        </div>
        {/* Aquí debes agregar lógica para seleccionar productos */}
        <div className="form-group">
          <label>Productos</label>
          <select
            value={products}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value=""> Seleccione un Cliente</option>
            {products.map(product => (
              <option key={product.id} value={product.id}>{product.nombre}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Monto Pagado</label>
          <input
            type="text"
            value={montoPagado}
            onChange={(e) => setMontoPagado(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Estado de Pago</label>
          <div>
                        <input
                            type="checkbox"
                            id="pagoCompleto"
                            checked={pagoCompleto}
                            onChange={(e) => setPagoCompleto(e.target.checked)}
                        />
                        <label htmlFor="pagoCompleto">Pago Completo</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="pagoParcial"
                            checked={pagoParcial}
                            onChange={(e) => setPagoParcial(e.target.checked)}
                        />
                        <label htmlFor="pagoParcial">Pago Parcial</label>
                    </div>
        </div>
        <button onClick={() => handleRealizarVenta}>Realizar Venta</button>
      </form>

      <div>
        <h3>Ventas Realizadas</h3>
        <ul>
          {venta.map((venta) => (
            <li key={venta.id}>
              <div>
                <p><strong>Vendedor:</strong> {venta.vendedorId}</p>
                <p>
                  <strong>Cliente:</strong> {venta.clienteId}</p>
                <p><strong>Total:</strong> {venta.total}</p>
                <p><strong>Fecha:</strong> {venta.fecha}</p>
                <p><strong>Monto Pago:</strong> {venta.montoPagado}</p>
                <p><strong>Estado de Pago:</strong> {venta.estadoPago}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Ventas;