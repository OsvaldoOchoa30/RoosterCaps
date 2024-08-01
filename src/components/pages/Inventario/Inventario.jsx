import React, { useEffect, useState } from "react";
import CardCaps from "../../molecules/CardCaps/CardCaps";
import NavBarGlobal from "../../molecules/NavBarGlobal/NavBarGlobal";
import { Container, Row } from "reactstrap";
import styles from "./Inventario.module.css";
const url = import.meta.env.VITE_URL_API;
function Inventario() {
  const [gorras, setGorras] = useState([]);

  const datasGet = async () => {
    try {
      const response = await fetch(`${url}api/v1/cap`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
  
      const data = await response.json();
      console.log(data);
      const seenNames = new Set();
      const uniqueGorras = data.filter(gorra => {
        if (seenNames.has(gorra.name)) {
          return false; 
        }
        seenNames.add(gorra.name);
        return true;
      });
  
      setGorras(uniqueGorras); 
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

  return (
    <>
      <NavBarGlobal />
      <h1 className={styles.title}>INVENTARIO ROOSTER CAPS</h1>
      <Container>
        <Row
          lg="5"
          md="3"
          sm="2"
          xs="1"
          style={{ display: "flex", justifyContent: "center" }}>
          {gorras.map((gorra, index) => (
            <CardCaps
              key={index}
              nombreCap={gorra.name}
              Precio={gorra.price}
              Imagen={gorra.imagen}
              link="/gorraadmin"
              id={gorra.id}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Inventario;
