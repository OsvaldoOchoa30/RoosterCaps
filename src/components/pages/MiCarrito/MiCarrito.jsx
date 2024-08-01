import React,{ useState, useEffect }  from 'react'
import CardInformation from '../../molecules/CardInformation/CardInformation';
import NavBarPrincipal from '../../molecules/NavBarPrincipal/NavBarPrincipal';
import styles from "./MiCarrito.module.css"
import TituloLogo from '../../atoms/TituloLogo/TituloLogo';
import Footer from '../../molecules/Footer/Footer';

const url = import.meta.env.VITE_URL_API;

function MiCarrito() {
  const [datos, setDatos] = useState([]);
  const [datos2, setDatos2] = useState([]);
  const getPedidos = async () =>{
    const results = [];
    const idUser = localStorage.getItem("userId");
    const result = await fetch(`${url}api/v1/order/pending/${idUser}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!result.ok) {
      throw new Error("Error fetching data");
    }
    const data2 = await result.json();
    setDatos(data2)
    console.log(data2);
   for (let i = 0; i < data2.length; i++) {
    const result2 = await fetch(`${url}api/v1/cap/${data2[i].id_gorra}`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!result2.ok) {
      throw new Error("Error fetching data");
    }
    const data = await result2.json();
    results.push(data);
   }
   setDatos2(results)
   console.log(results);
  }
  useEffect(()=>{
    getPedidos()
  },[])
  if (datos.length == 0  || datos2.length == 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
    <div>
    <NavBarPrincipal/>
    </div>

    <div className={styles.title}>
    <TituloLogo titulo="Mis Pedidos"/>
    </div>

    <div className={styles.principal}>
    {datos.map((cap,i) => (
      <div  key={i} className={styles.secundario}> 
      <CardInformation
        Gorra={datos2[i].name}
        Talla={cap.total}
        Precio={cap.Precio}
        Imagen={datos2[i].imagen}
        Cantidad={cap.cantidad}
        status={cap.status}
        idPedido={cap.id}
        carrito="carrito"
      />
      </div>
    ))}
    <Footer/>
    </div>
    </>
  )
}

export default MiCarrito