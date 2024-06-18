import React, { useContext, useEffect, useState} from 'react';
import { useParams} from 'react-router-dom';
import { CartContext } from '../CartContext';
import '../App.css';
import { PersonaService } from '../PersonaAPI';

function PurchaseHistory() {
  const { users, setAllUsers } = useContext(CartContext);
  const { purchases, returnProduct } = useContext(CartContext);
  const  [compras, setCompras] = useState([]);
  const personaService = new PersonaService();
  
  useEffect(() => {
    personaService.getCompras().then(data =>  {
      setCompras(data);
    }).catch(error => {
      console.error("Error fetching compras:", error);
    });
  }, [personaService, setCompras]);

  useEffect(() => {
    personaService.getUser().then(data =>  {
      setAllUsers(data);
    }).catch(error => {
      console.error("Error fetching USUARIOS:", error);
    });
  }, [personaService, setAllUsers]);

  const user = (vendedorId) =>{
    const vendedor = users.find(users=> users.id === vendedorId);
    return vendedor ? vendedor.nombre: 'Desconocido' ;
  };

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
          {compras.map((product) => (
            <li key={product.id} className="inventory-item">
              <span>{user(product.usuarioId)}</span>
              <span> <ul>
                  {product.productos.map((producto, index) => (
                    <li key={index}>{producto.nombre} - {producto.cantidad}</li>
                  ))}
                </ul> </span>
              <span>{product.fecha}</span>
              <span>{product.total.toFixed(2)}</span>
              <span><button onClick={() => handleReturn(product.id)} className="btn-delete">Eliminar</button></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default PurchaseHistory;
