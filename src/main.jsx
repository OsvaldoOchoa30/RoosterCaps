import React from "react";
import ReactDOM from "react-dom/client";
import {NextUIProvider} from '@nextui-org/react'

//import App from './App.jsx'
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Login y Registro
import Registro from "./components/pages/Registro/Registro";
import Login from "./components/pages/Login/Login"; //Pendiente

//Cliente
import Home from "./components/pages/Home/Home";
import MiCarrito from "./components/pages/MiCarrito/MiCarrito";
import MisCompras from "./components/pages/MisCompras/MisCompras";
import VerGorraCliente from "./components/pages/VerGorraCliente/VerGorraCliente";

import HomeAdmin from "./components/pages/HomeAdmin/HomeAdmin";
import Inventario from "./components/pages/Inventario/Inventario";
import VerGorraAdmin from "./components/pages/VerGorraAdmin/VerGorraAdmin";
import AgregarGorra from "./components/pages/AgregarGorra/AgregarGorra";

import PedidosNuevos from "./components/pages/PedidosNuevos/PedidosNuevos";
import PedidosenProceso from "./components/pages/PedidosenProceso/PedidosenProceso";
import PedidosCompletados from "./components/pages/PedidosCompletados/PedidosCompletados";
import Ventas from "./components/pages/Ventas/Ventas";
import VerPedido from "./components/pages/VerPedido/VerPedido";
import ConfirmarPedido from "./components/pages/ConfirmarPedido/ConfirmarPedido";




import MarcaNewEra from "./components/pages/MarcaNewEra/MarcaNewEra";
import Marca47 from "./components/pages/Marca47/Marca47";
import MarcaGorinBros from "./components/pages/MarcaGorinBros/MarcaGorinBros";
import MarcaMrKash from "./components/pages/MarcaMrKash/MarcaMrKash";
import MarcaCorralRanch from "./components/pages/MarcaCorralRanch/MarcaCorralRanch";

import GorraCurva from "./components/pages/GorraCurva/GorraCurva";
import GorraPlana from "./components/pages/GorraPlana/GorraPlana";




const pages = createBrowserRouter([
  {
    //HOME
    path: "/",
    element: <Home />,
  },
  {
    //Registro
    path: "/registro",
    element: <Registro />,
  },
  {
    //Login
    path: "/login",
    element: <Login />,
  },
  {
    //Carrito de Apartados
    path: "/carrito",
    element: <MiCarrito />,
  },
  {
    //Mis Compras
    path: "/miscompras",
    element: <MisCompras />,
  },
  {
    //Ver Gorra Cliente
    path: "/vergorra/:id",
    element: <VerGorraCliente />,
  },
  {
    //Pedidos Pendientes Admin
    path: "/pedidosnuevos",
    element: <PedidosNuevos />,
  },

  {
    //Pedidos en Proceso Admin
    path: "/pedidosenproceso",
    element: <PedidosenProceso />,
  },
  {
    //Pedidos en Proceso Admin
    path: "/pedidoscompletados",
    element: <PedidosCompletados />,
  },
  {
    //Ver Pedidos para establecer el status
    path: "/confirmar/:id",
    element: <ConfirmarPedido />,
  },
  {
    //Ver Pedidos para establecer el status
    path: "/verpedido/:id",
    element: <VerPedido/>,
  },
  {
    //Inventario Admin
    path: "/inventario",
    element: <Inventario />,
  },
  {
    //Agregar Gorras
    path: "/agregargorra",
    element: <AgregarGorra />,
  },
  {
    //Agregar Gorras
    path: "/gorraadmin/:id",
    element: <VerGorraAdmin/>,
  },
  {
    //Agregar Gorras
    path: "/ventas",
    element: <Ventas/>,
  },
  {
    //Agregar Gorras
    path: "/admin",
    element: <HomeAdmin/>,
  },
  {
    //New Era
    path: "/newera",
    element: <MarcaNewEra/>
  },
  {
    //47
    path: "/47caps",
    element: <Marca47/>
  },
  {
    //Gorin Bros
    path: "/goorinbros",
    element: <MarcaGorinBros/>
  },
  {
    //Mr Kash
    path: "/mrkash",
    element: <MarcaMrKash/>
  },
  {
    //Corral & Ranch
    path: "/ranchcorral",
    element: <MarcaCorralRanch/>
  },
  {
    //Planas
    path: "/planas",
    element: <GorraPlana/>
  },
  {
    //Curvas
    path: "/curvas",
    element: <GorraCurva/>
  },
  

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
    <RouterProvider router={pages} />
    </NextUIProvider>
  </React.StrictMode>
);
