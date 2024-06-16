import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import '../App.css';

function PurchaseHistory() {
  const { purchases, returnProduct } = useContext(CartContext);

  const handleReturn = (productId) => {
    returnProduct(productId);
  };

  return (
    <div className="inventory">
      <h2>Compras</h2>
      <div className="inventory-list">
        <ul>
          <li className="inventory-header">
            <span>Vendedor</span>
            <span>Productos</span>
            <span>Fecha</span>
            <span>Total</span>
            <span>Opción</span>
          </li>
          {purchases.map((product) => (
            <li key={product.id} className="inventory-item">
              <span>{product.vendedorID}</span>
              <span>{product.nombre} - {product.cantidad}</span>
              <span>{product.fecha}</span>
              <span>{new Date(product.addedDate).toLocaleDateString()}</span>
              <span><button onClick={() => handleReturn(product.id)} className="btn-delete">Eliminar</button></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default PurchaseHistory;
