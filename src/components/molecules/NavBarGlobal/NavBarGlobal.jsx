import React, { useState } from 'react';
import logo from "../../../assets/logoOficial.png"
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import { HiCurrencyDollar } from "react-icons/hi2";
import { MdAccountCircle } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import styles from "./NavBarGlobal.module.css"

function NavBarGlobal(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.nav} >
      <Navbar className="navbar-dark bg-dark navbar-expand-lg"  {...args}
      fixed='top'>
        <NavbarBrand href="/admin"><img src={logo} alt="ROSTER CAPS" style={{height: "50px"}} /></NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
          <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Pedidos
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem href="/pedidosnuevos">Nuevos</DropdownItem>
                <DropdownItem href="/pedidosenproceso">En Proceso</DropdownItem>
                <DropdownItem href="/pedidoscompletados">Concluidos</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink href="/agregargorra">Agregar Producto</NavLink>
            </NavItem>
          </Nav>

          <NavItem>
              <NavLink href="/inventario">
              <FaBoxOpen
              color='white'   
              size="35px"
              style={{marginLeft:"-96px", position:"absolute", bottom:"19px", width:"34px"}}
              />
              </NavLink>
            </NavItem>
          
          <NavItem>
              <NavLink href="/ventas">
              <HiCurrencyDollar
              color='white'   
              size="35px"
              style={{marginLeft:"-100px", position:"absolute", bottom:"20px", width:"100px"}}
              />
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/login ">
              {/*Este es el icono del Perfil, falta rutearlo*/}
              <TbLogout2
              color='white'
              size="35px"
              style={{marginLeft:"-40px", position:"absolute", bottom:"20px"}}
              />
              </NavLink>
            </NavItem>


          <NavbarText>ROOSTER CAPS</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBarGlobal;
