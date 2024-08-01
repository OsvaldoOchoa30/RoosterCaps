import React,{useState,useEffect} from "react";
import TituloLogo from "../../atoms/TituloLogo/TituloLogo";
import TituloRegistro from "../../atoms/TituloRegistro/TituloRegistro";
import CardInformation from "../../molecules/CardInformation/CardInformation";
import BottomRegistro from "../../atoms/ButtomRegistro/ButtomRegistro";
import { useParams } from "react-router-dom";
const url = import.meta.env.VITE_URL_API;
function ConfirmarPedido() {
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  const [datos2, setDatos2] = useState([]);
  const [datos3, setDatos3] = useState([]);

  const datasGet = async () => {
    try {
      const response = await fetch(`${url}api/v1/order/all/complet/order`, {
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
      const filteredData = data.filter(item => item.id === parseInt(id));
      setDatos(filteredData);
      const response2 = await fetch(`${url}api/v1/cap/${Number(filteredData[0].id_gorra)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response2.ok) {
        throw new Error("Error fetching data");
      }
      const data2 = await response2.json();
      setDatos2(data2)
      const response3 = await fetch(`${url}api/v1/size/${Number(data2.talla_id)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response3.ok) {
        throw new Error("Error fetching data");
      }
      const data3 = await response3.json();
      setDatos3(data3)
      return true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const confirmar= async (status) =>{
    const result = await fetch(`${url}api/v1/order/status/${datos[0].id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({newStatus:status})
    })
    if (!result.ok) {
      throw new Error("Error fetching data");
    }
    alert(`Pedido ${status}`)
    location.reload();
  }

  useEffect(() => {
    datasGet();
    return () => {
      console.log("Componente desmontado");
    };
  }, []);
  if (datos.length == 0 || datos3 == undefined || datos3.length == 0) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <TituloLogo titulo="Osvaldo Ochoa" />
      {datos.map((pedido,i) => (
        <CardInformation
        key={i}
          Gorra={pedido.Titulo}
          Talla={datos3[0].talla}
          Precio={datos2.price}
          Imagen={datos2.imagen}
          Cantidad={pedido.cantidad}
          confir="confirmar"
        />
      ))}

      <TituloRegistro titulo={"Total: " + datos[0].total} />
      <BottomRegistro onClickF={()=>confirmar("Completado")} botonRegistro="COMPLETAR PEDIDO" />
      <BottomRegistro onClickF={()=>confirmar("Cancelado")} botonRegistro="CANCELAR PEDIDO" />
    </div>
  );
}

export default ConfirmarPedido;
