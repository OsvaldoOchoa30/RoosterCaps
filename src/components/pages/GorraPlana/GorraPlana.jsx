import React, { useState, useEffect }  from 'react'
import NavBarPrincipal from "../../molecules/NavBarPrincipal/NavBarPrincipal";
import CardCaps from "../../molecules/CardCaps/CardCaps";
import Footer from "../../molecules/Footer/Footer";
import TituloLogo from "../../atoms/TituloLogo/TituloLogo";
import { Container, Row } from "reactstrap";
import styles from "./GorraPlana.module.css"
const url = import.meta.env.VITE_URL_API;

function GorraPlana() {
  const [gorras2, setGorras2] = useState([]);

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
      const uniqueGorras = data.filter((gorra) => {
        if (seenNames.has(gorra.name)) {
          return false;
        }
        seenNames.add(gorra.name);
        return true;
      });

      setGorras2(uniqueGorras);
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
    <div className={styles.nav}>
      <NavBarPrincipal />
    </div>
    <div className={styles.title}>
      <TituloLogo titulo="Gorras Planas" />
    </div>
    <Container>
      <Row
        lg="5"
        md="3"
        sm="2"
        xs="1"
        style={{ display: "flex", justifyContent: "center" }}
      >
       {gorras2.map((gorra) => (
           <>{gorra.tipo ==="plana" ?( <CardCaps
            key={gorra.Titulo}
            nombreCap={gorra.name}
            Precio={gorra.price}
            Imagen={gorra.imagen}
            link="/vergorra"
            id={gorra.id}
          />):null}
           </>
          ))}
      </Row>
    </Container>

    <Footer />
  </>
  )
}

export default GorraPlana