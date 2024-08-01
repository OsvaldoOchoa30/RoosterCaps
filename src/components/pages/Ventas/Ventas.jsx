import React from 'react'
import CardData from '../../molecules/CardData/CardData'
import NavBarGlobal from '../../molecules/NavBarGlobal/NavBarGlobal'

function PedidosenProceso() {
    const cartaInormacion = [
        {
            Usuario: "Osvaldo Ochoa",
            FechaPedido: 1,
            FechaEntrega: "Fecha de Entrega: 27/06/2024",
            Total: "$1,500.00",
            
        },
        {
            Usuario: "Fredy de la rosa",
            FechaPedido: 2,
            FechaEntrega: "Fecha de Entrega: 24/06/2024",
            Total: "$1,500.00",
            
        },
        {
            Usuario: "Osvaldo Ochoa",
            FechaPedido: 3,
            FechaEntrega: "Fecha de Entrega: 25/06/2024",
            Total: "$1,500.00",
            
        },
    ]

  return (
    <>
    <NavBarGlobal/>
    <div style={{
        display: "block",
        justifyContent:"center",
        flexDirection: "column"
    }}>
    {cartaInormacion.map((data) => (
        <div style={{
            display: "flex",
            justifyContent: "center",
            width: "100%"
        }}>
        <CardData
            usuario={data.Usuario}
          fechaPedido={data.FechaPedido}
          fechaEntrega={data.FechaEntrega}          
          total={data.Total}
          boton="Ver Mas"
          page="/verpedido"
        />
         </div>
      ))}
     
      </div>
    </>
  )
}

export default PedidosenProceso