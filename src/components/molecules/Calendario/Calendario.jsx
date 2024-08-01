import React, { useState } from "react";
import { DatePicker } from "@nextui-org/date-picker";
import BottomRegistro from "../../atoms/ButtomRegistro/ButtomRegistro";
import { getLocalTimeZone, today } from "@internationalized/date";
const url = import.meta.env.VITE_URL_API;

function Calendario({ link }) {
const [datos, setDatos] = useState();

console.log(datos);
  const datasGet = async () => {
    try {
      const response = await fetch(`${url}api/v1/order/date/${link}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ new_date: datos }),
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      console.log(data);
      alert("Fecha asignada")
      return true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div>
        <DatePicker
          label="Selecciona la Fecha"
          className="max-w-[284px]"
          minValue={today(getLocalTimeZone())}
          defaultValue={today(getLocalTimeZone()).subtract({ days: 0 })}
          onChange={(e) => setDatos(e.year+"/"+e.month+"/"+e.day)}
        />
        <BottomRegistro onClickF={datasGet} botonRegistro="Asignar Fecha" />
      </div>
    </>
  );
}

export default Calendario;
