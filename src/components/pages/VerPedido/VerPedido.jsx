import React, { useState, useEffect } from "react";
import TituloLogo from "../../atoms/TituloLogo/TituloLogo";
import TituloRegistro from "../../atoms/TituloRegistro/TituloRegistro";
import CardInformation from "../../molecules/CardInformation/CardInformation";
import BottomRegistro from "../../atoms/ButtomRegistro/ButtomRegistro";
import styles from './VerPedido.module.css';
import { useParams } from "react-router-dom";
const url = import.meta.env.VITE_URL_API;

function VerPedido() {
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  const [datos2, setDatos2] = useState([]);
  const tallas =["Universal", "7", "7 1/8", "7 1/4", "7 1/2", "7 3/4"]
  const datasGet = async () => {
    try {
      const response = await fetch(`${url}api/v1/order/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setDatos(data);
      const response2 = await fetch(`${url}api/v1/cap/${data[0].id_gorra}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response2.ok) {
        throw new Error("Error fetching data");
      }
      const data2 = await response2.json();
      setDatos2(data2);
      return true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(datos);
  useEffect(() => {
    datasGet();
    return () => {
      console.log("Componente desmontado");
    };
  }, []);
  if (datos.length == 0) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.verPedido}>
      <TituloLogo titulo={datos[0].created_by} />
      {datos.map((pedido, index) => (
        <CardInformation
          key={index}
          Gorra={pedido.name}
          Talla={tallas[datos2.talla_id-1]}
          Precio={datos2.price}
          Imagen={datos2.imagen}
          Cantidad={pedido.cantidad}
          confir="confirmar"
        />
      
      ))}
      <TituloRegistro titulo={"Total: $" + datos[0].total} />
      <div className={styles.btnGroup}>

      </div>
    </div>
  );
}

export default VerPedido;
