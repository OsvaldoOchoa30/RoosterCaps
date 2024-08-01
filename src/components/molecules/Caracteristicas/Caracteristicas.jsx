import React, { useState, useEffect } from "react";
import TituloLogo from "../../atoms/TituloLogo/TituloLogo";
import TituloRegistro from "../../atoms/TituloRegistro/TituloRegistro";
import ParrafoRegistro from "../../atoms/ParrafoRegistro/ParrafoRegistro";
import ImputRegistro from "../../atoms/ImputRegistro/ImputRegistro";
import BottomRegistro from "../../atoms/ButtomRegistro/ButtomRegistro";
import styles from "./Caracteristicas.module.css";

const url = import.meta.env.VITE_URL_API;

function Caracteristicas({
  nombre,
  precio,
  descripcion,
  imagen,
  tallas,
  id_gorra,
}) {
  const [cantidad, setCantidad] = useState(1);
  const [talla, setTalla] = useState([]);
  const [total, setTotal] = useState(1);
  const [suma, setSuma] = useState(0);
  const handleCantidad = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      // Solo números
      setCantidad(value);
    }
  };

  const tallasA = [7, "7 1/8", "7 1/4", "7 1/2", "7 3/4"];
 

  const agregarAlCarrito = async () => {
    if (!cantidad) {
      alert("Cantidad de Gorra no Definida");
    } else if (Number(cantidad) === 0) {
      alert("No se permite el 0");
    } else if (Number(cantidad) > talla[0].cantidad) {
      alert("No se permite colocar un dato mayor al stock");
    } else {
      const idUser = localStorage.getItem("userId");

      const data = await fetch(`${url}api/v1/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_id: idUser,
          id_gorra: id_gorra+suma,
          cantidad: cantidad,
          total: total,
          created_by: "Juanito",
        }),
      });
      if (!data.ok) {
        throw new Error("Error fetching data");
      }
      const data2 = await data.json();
      console.log(data2);
      alert(`Pedido realizado`);
    }
  };
console.log(suma);
  const getTallas = async (id_talla, name) => {
    try {
      const response = await fetch(
        `${url}api/v1/inventary/${id_talla}/${name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      setTalla(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    setTotal(cantidad * precio);
  }, [cantidad, precio]);

  useEffect(() => {
    getTallas(tallas, nombre);
  }, [tallas, nombre]);

  if (!talla.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.principal}>
      <div className={styles.div1}>
        <img className={styles.img} src={imagen} alt={nombre} />
        <div className={styles.description}>
          <ParrafoRegistro registro={descripcion} />
        </div>
      </div>

      <div className={styles.div2}>
        <TituloLogo titulo={nombre} />

        <TituloRegistro
          titulo={"Total en stock: " + Number(talla[0].cantidad)}
        />

        <TituloRegistro titulo={"Precio: " + precio} />

        <div>
          <ParrafoRegistro registro="TALLA" />
          {tallas !== 1 ? (
            tallasA.map((talla, index) => (
              <BottomRegistro
                key={index}
                value={index + 2}
                className={styles.button}
                botonRegistro={talla}
                onClickF={() =>{ getTallas(index + 2, nombre),setSuma(index);}}
              />
              
            ))
          ) : (
            <p>Unitalla</p>
          )}
        </div>

        <div>
          <ParrafoRegistro registro="CANTIDAD" />
          <ImputRegistro
            inputType="number"
            onChange={handleCantidad}
            value={cantidad}
          />
        </div>

        <TituloRegistro titulo={"Total a pagar: $" + total} />

        <BottomRegistro
          botonRegistro="AGREGAR PEDIDO"
          color="dark"
          height="40px"
          width="390px"
          onClickF={agregarAlCarrito}
        />
        <BottomRegistro
          botonRegistro="VER PEDIDOS"
          color="dark"
          height="40px"
          width="390px"
          onClickF={() => window.location.assign("/carrito")}
        />
      </div>
    </div>
  );
}

export default Caracteristicas;
