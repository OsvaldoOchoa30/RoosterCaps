import React, { useState, useEffect } from "react";
import CardInformation from "../../molecules/CardInformation/CardInformation";
import NavBarPrincipal from "../../molecules/NavBarPrincipal/NavBarPrincipal";
import Footer from "../../molecules/Footer/Footer";
import TituloLogo from "../../atoms/TituloLogo/TituloLogo";
import styles from "./Compras.module.css";
const url = import.meta.env.VITE_URL_API;
function MisCompras() {
  const [datos, setDatos] = useState();
  const [datos2, setDatos2] = useState([]);
  const tallas =["Universal", "7", "7 1/8", "7 1/4", "7 1/2", "7 3/4"]
  const iduser = localStorage.getItem('userId');
  const datasGet = async () => {
    try {
      const response = await fetch(`${url}api/v1/order/details/order`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      console.log(data[0]);
      const filteredData = data.filter(item => item.cliente_id === parseInt(iduser));
      setDatos(filteredData);
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
      console.log(data2);
      return true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    datasGet();
    return () => {
      console.log("Componente desmontado");
    };
  }, []);
  if (datos == undefined) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className={styles.principal}>
        <NavBarPrincipal />
      </div>

      <div className={styles.titulo}>
        <TituloLogo titulo="Mis Compras" />
      </div>

      <div className={styles.principal}>
        {datos.map((cap, i) => (
          <div key={i} className={styles.secundario}>
            <CardInformation
              Gorra={cap.name}
              Talla={tallas[datos2.talla_id-1]}
              Precio={datos2.price}
              Imagen={datos2.imagen}
              Cantidad={cap.cantidad}
              confir="confirmar"
            />
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default MisCompras;
