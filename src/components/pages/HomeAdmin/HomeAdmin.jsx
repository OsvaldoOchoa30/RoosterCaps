import React from "react";
import CardCaps from "../../molecules/CardCaps/CardCaps";
import NavBarGlobal from "../../molecules/NavBarGlobal/NavBarGlobal";
import { Container, Row } from "reactstrap";
import { Link } from "react-router-dom";

import AdminAdd from "../../../assets/adminadd.png";
import AdminProces from "../../../assets/adminproces.png";
import AdminFinish from "../../../assets/adminfinish.png";

function HomeAdmin() {
  const gorras = [
    {
      Imagen: AdminAdd,
      Titulo: "Pedidos Nuevos",
      Precio: "Asignar Fecha",
      Link: "/pedidosnuevos",
    },
    {
      Imagen: AdminProces,
      Titulo: "Pedidos en Proceso",
      Precio: "Asignar Estado",
      Link: "pedidosenproceso",
    },
    {
      Imagen: AdminFinish,
      Titulo: "Pedidos Concluidos",
      Precio: "Ver Pedidos Completados",
      Link: "pedidoscompletados",
    },
  ];
  return (
    <>
      <NavBarGlobal style={{ maring: "60px" }} />
      <Container>
        <Row
          lg="4"
          md="3"
          sm="2"
          xs="1"
          style={{ display: "flex", justifyContent: "center" }}>
          {gorras.map((gorra) => (
            <CardCaps
              key={gorra.Titulo}
              nombreCap={gorra.Titulo}
              Imagen={gorra.Imagen}
              hrfs={gorra.Link}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomeAdmin;
