
/* 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from 'react' //rfc

 import Registro from "./components/pages/Registro/Registro";
 import Login from "./components/pages/Login/Login"; //Pendiente
 import Home from "./components/pages/Home/Home";
 import MarcaUno from "./components/pages/MarcaUno/MarcaUno";
 import MiCarrito from "./components/pages/MiCarrito/MiCarrito";
 import MisCompras from "./components/pages/MisCompras/MisCompras";
 import VerGorraCliente from "./components/pages/VerGorraCliente/VerGorraCliente";


 import AgregarGorra from "./components/pages/AgregarGorra/AgregarGorra";
 import Inventario from "./components/pages/Inventario/Inventario";

 import PedidosenProceso from "./components/pages/PedidosenProceso/PedidosenProceso";
 import VerPedidosenProceso from "./components/pages/VerPedidosenProceso/VerPedidosenProceso";
 import PedidosPendientes from "./components/pages/PedidosPendientes/PedidosPendientes";



//Las rutas deben de ir en la version 6

//los nombres de los componentes inician con mayuscula
function App() {
  return (
    <BrowserRouter>
    <Routes>
        
       <Route path="/Registro"  element={<Registro/>}/> 
        <Route path="/Login"  element={<Login/>}/> 
        <Route path="/" element={<Home/>}/>
     
        <Route path="/MarcaUno" element={<MarcaUno/>}/>
        <Route path="/MiCarrito" element= {<MiCarrito/>} />
        <Route path="/MisCompras" element= {<MisCompras/>}/>
        <Route path="/Inventario" element={<Inventario/>}/>
        <Route path="/AgregarGorra" element={<AgregarGorra/>}/>
        <Route path='/VerGorra' element={<VerGorraCliente/>}/>

        <Route path="/PedidosPendientes" element={<PedidosPendientes/>}/>
        <Route path="/PedidosenProceso" element={<PedidosenProceso/>}/>

        <Route path="/VerPedidosenProceso" element={<VerPedidosenProceso/>}/>
      
        
            
    </Routes>
    </BrowserRouter>
  )
}

export default App */