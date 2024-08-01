import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import ParrafoRegistro from "../../atoms/ParrafoRegistro/ParrafoRegistro";
import TituloRegistro from "../../atoms/TituloRegistro/TituloRegistro";
import ButtonDelete from "../../atoms/ButtonDelete/ButtonDelete";
import BottomRegistro from '../../atoms/ButtomRegistro/ButtomRegistro';
import styles from "./CardInformation.module.css";

const url = import.meta.env.VITE_URL_API;
function CardInformation({
  Imagen,
  Gorra,
  Talla,
  Precio,
  Cantidad,
  status,
  carrito,
  idPedido,
  OnDataChange,
  confir
}) {
  

  const eliminar =async () => {
    const result = await fetch(`${url}api/v1/order/status/${idPedido}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newStatus:"Cancelado"})
    })
    if (!result.ok) {
      throw new Error("Error fetching data");
    }
    alert("Pedido cancelado")
    location.reload();
  };
 
  return (
    <Card style={{ width: "60em", margin: "10px" }}>
      {confir=="confirmar"?(<div className={styles.contenedor}>
        <div className={styles.imagen}>
          <a href="vergorra">
            <img src={Imagen} alt="Gorra XD" width="200px" />
          </a>
        </div>

        <div className={styles.datos}>
          <ParrafoRegistro registro={Gorra} />
          <ParrafoRegistro registro={"Precio: $" + Precio} />
        </div>

        <div className={styles.cantidad}>
          <>
            {Cantidad === "0" ? (
              <input
                className={styles.input}
                type="number"
                placeholder="Cantidad"
              />
            ) : (
              <h3>{"cantidad: " + Cantidad}</h3>
            )}
          </>
        </div>

        <div className={styles.precio}>
          <TituloRegistro titulo={`Talla: ${Talla}`} />
        </div>

        
      </div>):(
        <div className={styles.contenedor}>
        <div className={styles.imagen}>
          <a href="vergorra">
            <img src={Imagen} alt="Gorra XD" width="200px" />
          </a>
        </div>

        <div className={styles.datos}>
          <ParrafoRegistro registro={Gorra} />
          <ParrafoRegistro registro={"Estatus: " + status} />
        </div>

        <div className={styles.cantidad}>
          <>
            {Cantidad === "0" ? (
              <input
                className={styles.input}
                type="number"
                placeholder="Cantidad"
              />
            ) : (
              <h3>{"cantidad: " + Cantidad}</h3>
            )}
          </>
        </div>

        <div className={styles.precio}>
          <TituloRegistro titulo={`Total: $${Talla}`} />
        </div>

        {(status !== "Cancelado") && (
          <div className={styles.cantidad} onClick={eliminar}>
            <ButtonDelete />
          </div>
        )}
      </div>
      )}
      
    </Card>
  );
}

export default CardInformation;
