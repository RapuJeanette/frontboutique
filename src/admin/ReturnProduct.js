import React, { useContext } from 'react';
import { CartContext } from '../CartContext';
import '../App.css';

function ReturnProduct() {
  const { returns } = useContext(CartContext);

  return (
    <div className="return-product">
      <h2>Productos Devueltos</h2>
      {returns.length === 0 ? (
        <p>No hay productos devueltos.</p>
      ) : (
        <ul>
          {returns.map((returnedItem) => (
            <li key={returnedItem.id} className="return-item">
              <img src={returnedItem.image} alt={returnedItem.name} className="return-item-image" />
              <div className="return-item-details">
                <h3>{returnedItem.name}</h3>
                <p>Fecha de Devolución: {new Date(returnedItem.date).toLocaleDateString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ReturnProduct;
