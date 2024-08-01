import React, { useState, useEffect } from "react";
import CardData from "../../molecules/CardData/CardData";
import NavBarGlobal from "../../molecules/NavBarGlobal/NavBarGlobal";
const url = import.meta.env.VITE_URL_API;
function PedidosNuevos() {
  const [datos, setDatos] = useState([]);
  const datasGet = async () => {
    try {
      const response = await fetch(`${url}api/v1/order/all/asigned/date`, {
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
    <>
      <NavBarGlobal />
      <div
        style={{
          display: "block",
          justifyContent: "center",
          flexDirection: "column",
        }}>
        {datos.map((data, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}>
            <CardData
              usuario={data.order.created_by}
              fechaPedido={data.order.FechaPedido}
              fechaEntrega={data.order.created_at}
              total={data.order.total}
              calendario="calendario"
              id={data.order.id}
              page={`/verpedido/${data.order.id}`}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default PedidosNuevos;
