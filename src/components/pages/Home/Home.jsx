import React from "react";
import NavBarPrincipal from "../../molecules/NavBarPrincipal/NavBarPrincipal";
import CardCaps from "../../molecules/CardCaps/CardCaps";
import Footer from "../../molecules/Footer/Footer";
import Carrusel from "../../molecules/Carrusel/Carrusel";

import cardNewEra from '../../../assets/logonew.png';
import card47 from '../../../assets/logo47.png';
import cardGorin from '../../../assets/logogorin.png';
import cardRanch from '../../../assets/logoranch.png';
import cardMr from '../../../assets/logomr.png';
import cardCurva from '../../../assets/curva.png';
import cardPlana from '../../../assets/plana.png';

import { Container, Row } from "reactstrap";

const gorras = [
  {
    Imagen: cardNewEra,
    Titulo: "New Era",
    Link: "/newera",
    id:1
  },
  {
    Imagen: cardRanch,
    Titulo: "Ranch & Corral",
    Link: "/ranchcorral",
    id:5
  },
  {
    Imagen: cardGorin,
    Titulo: "Goorin Bros.",
    Link: "/goorinbros",
    id:3
  },
  {
    Imagen: cardMr,
    Titulo: "Mr. Kash",
    Link: "/mrkash",
    id:4
  },
  {
    Imagen: card47,
    Titulo: "47",
    Link: "/47caps",
    id:2
  },
  {
    Imagen: cardCurva,
    Titulo: "Curvas",
    Link: "/curvas"
  },
  {
    Imagen: cardPlana,
    Titulo: "Planas",
    Link: "/planas"
  },
];

function Home() {
  
  return (
    <>
      <NavBarPrincipal />
      <Carrusel />
      <h1 className="text-center mb-4">NUESTROS PRODUCTOS</h1>
      <Container>
        <Row
          lg='5'
          md="3"
          sm="2"
          xs="1"
          className="d-flex justify-content-center"
        >
          {gorras.map((gorra) => (
            <CardCaps
              hrfs={gorra.Link}
              key={gorra.Titulo} 
              nombreCap={gorra.Titulo}
              Precio={gorra.Precio}
              Imagen={gorra.Imagen}
              link={null}
              idC={gorra.id}
              color="dark"
            />
          ))}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
