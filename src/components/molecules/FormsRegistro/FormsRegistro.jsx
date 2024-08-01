//Conectado con el Back Exitosamente

import React, { useState } from 'react';
import ButtoomRegistro from '../../atoms/ButtomRegistro/ButtomRegistro';
import ImputRegistro from '../../atoms/ImputRegistro/ImputRegistro';
import TituloRegistro from '../../atoms/TituloRegistro/TituloRegistro';
import { Form, FormGroup, Col } from 'reactstrap';
import styles from './FormsRegistro.module.css';
const url = import.meta.env.VITE_URL_API
function FormsRegistro() {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    phone_number: ""
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validate = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (value.trim() === '') {
          error = 'El nombre de usuario es obligatorio';
        } else if (value.trim().length < 6) {
          error = 'El nombre de usuario debe tener al menos 6 caracteres';
        } else if (/\d{4,}/.test(value)) {
          error = 'El nombre de usuario no puede contener más de 3 dígitos consecutivos';
        }
        break;
      case 'password':
        if (value.trim() === '') {
          error = 'La contraseña es obligatoria';
        } else if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
          error = 'La contraseña debe contener al menos una letra y un número';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'El correo electrónico no es válido';
        }
        break;
      case 'phone_number':
        if (!/^\d{10}$/.test(value)) {
          error = 'El número de teléfono debe tener 10 dígitos';
        }
        break;
      default:
        break;  
    }

    return error;
  };

const handleFormSubmit = async () => {
    const newErrors = {};
    let valid = true;

    // Validación del formulario
    for (const key in formData) {
        const error = validate(key, formData[key]);
        if (error) {
            newErrors[key] = error;
            valid = false;
        }
    }

    setErrors(newErrors);
    setIsFormValid(valid);

    if (valid) {
        try {
            const response = await fetch(`${url}api/v1/custumer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            // Verifica el estado de la respuesta
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            alert("result.message");  // Asegúrate de que el backend devuelva un mensaje
            window.location.href = '/login';
        } catch (error) {
            // Manejo de errores
            console.error('Error en la solicitud:', error);
            alert(`Error de conexión: ${error.message}`);
        }
    } else {
        alert("Hay errores en el formulario");
    }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone_number' && /\D/.test(value)) return; // Permite solo dígitos
    setFormData({ ...formData, [name]: value });

    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validate(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit();
  };

  return (
    <div className={styles.container}>
      <TituloRegistro titulo="Crear Cuenta" />

      <Form onSubmit={handleSubmit}>
        <FormGroup row style={{ display: 'flex', justifyContent: 'center' }}>
          <Col sm={10}>
            <ImputRegistro
              inputText="Nombre de Usuario"
              inputType="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.name}
            />
          </Col>
        </FormGroup>

        <FormGroup row style={{ display: 'flex', justifyContent: 'center' }}>
          <Col sm={10}>
            <ImputRegistro
              inputText="Contraseña"
              inputType="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
            />
          </Col>
        </FormGroup>

        <FormGroup row style={{ display: 'flex', justifyContent: 'center' }}>
          <Col sm={10}>
            <ImputRegistro
              inputText="Correo Electrónico"
              inputType="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
            />
          </Col>
        </FormGroup>

        <FormGroup row style={{ display: 'flex', justifyContent: 'center' }}>
          <Col sm={10}>
            <ImputRegistro
              inputText="Número de Teléfono"
              inputType="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.phone_number}
            />
          </Col>
        </FormGroup>

        <FormGroup row style={{ display: 'flex', justifyContent: 'center' }}>
          <Col sm={10} style={{ display: 'flex', justifyContent: 'center' }}>
            <ButtoomRegistro botonRegistro="Registrarse" onClickF={handleFormSubmit} />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}

export default FormsRegistro;
