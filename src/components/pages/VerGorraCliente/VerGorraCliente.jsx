import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Caracteristicas from "../../molecules/Caracteristicas/Caracteristicas";
import NavBarPrincipal from "../../molecules/NavBarPrincipal/NavBarPrincipal";
import Footer from "../../molecules/Footer/Footer";
const url = import.meta.env.VITE_URL_API;
function VerGorraCliente() {
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  const datasGet = async () => {
    try {
      const response = await fetch(`${url}api/v1/cap/${id}`, {
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
      console.log(data);
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
  if (datos.length == 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <NavBarPrincipal />
      </div>

      <div>
          <Caracteristicas
            nombre={datos.name}
            precio={datos.price}
            descripcion={datos.descripcion}
            imagen={datos.imagen}
            tallas={datos.talla_id}
            id_gorra ={datos.id}
            
          />

      </div>
      <Footer />
    </div>
  );
}

export default VerGorraCliente;
