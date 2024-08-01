import React, { useState } from "react";
import TituloRegistro from "../../atoms/TituloRegistro/TituloRegistro";
import ParrafoRegistro from "../../atoms/ParrafoRegistro/ParrafoRegistro";
import BottomRegistro from "../../atoms/ButtomRegistro/ButtomRegistro";
import ImputRegistro from "../../atoms/ImputRegistro/ImputRegistro";
import styles from "./FormsLogin.module.css";
import { Form, FormGroup, Col } from "reactstrap";
const url =import.meta.env.VITE_URL_API
function FormsLogin() {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const validar = async () => {
    if (nombre === '') {
      alert("Espacio de usuario vacío");
      return;
    } 
    if (password === '') {
      alert("Espacio de contraseña vacío");
      return;
    }

    try {
  
      const response = await fetch(`${url}api/v1/custumer/login`, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: nombre, password: password }),
      });

      const data = await response.json();

      console.log('Response Status:', response.status); 
      console.log('Response Data:', data.login.token); 

      if (response.ok) { 
        alert("Inicio de sesión exitoso");
        localStorage.setItem('token', data.login.token);
        localStorage.setItem('userId', data.login.id);
        if (data.id === 1) {
          window.location.assign("/admin")
        } else {
        window.location.assign('/');}
      } else {
        alert(data.message || 'Error en el inicio de sesión');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Error en el inicio de sesión');
    }
};

  const handleRegistro = () => {
    window.location.assign('/registro');
  };

  return (
    <>
      <div className={styles.container}>
        <TituloRegistro titulo="Inicia de Sesion" />
        <ParrafoRegistro registro="Para conocer nuestros productos" />

        <Form>
          <FormGroup row style={{ display: "flex", justifyContent: "center" }}>
            <Col sm={10}>
              <ImputRegistro inputText="Email de Usuario" inputType="texto" onChange={handleNombre} />
            </Col>
          </FormGroup>

          <FormGroup row style={{ display: "flex", justifyContent: "center" }}>
            <Col sm={10}>
              <ImputRegistro inputText="Contraseña" inputType="password" onChange={handlePassword} />
            </Col>
          </FormGroup>

          <FormGroup row style={{ display: "flex", justifyContent: "center" }}>
            <Col sm={10} style={{ display: "flex", justifyContent: "center" }}>
              <BottomRegistro botonRegistro="Iniciar Sesion" onClickF={validar} />
            </Col>
          </FormGroup>

          <ParrafoRegistro registro="Si no tienes cuenta, puedes crear una." />

          <FormGroup row style={{ display: "flex", justifyContent: "center" }}>
            <Col sm={10} style={{ display: "flex", justifyContent: "center" }}>
              <BottomRegistro botonRegistro="Registrarse" onClickF={handleRegistro} />
            </Col>
          </FormGroup>
        </Form>
      </div>
    </>
  );
}

export default FormsLogin;
