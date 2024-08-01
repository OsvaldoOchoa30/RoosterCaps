import React, { useState } from "react";
import ImputRegistro from "../../atoms/ImputRegistro/ImputRegistro";
import BottomRegistro from "../../atoms/ButtomRegistro/ButtomRegistro";
import TallasCap from "../../molecules/TallasCap/TallasCap";
import Unitalla from "../../molecules/UnitallaCap/Unitalla";
import { Form, FormGroup, Col, Label, Input, FormText } from "reactstrap";
import styles from "./FormsAddCap.module.css";

const url = import.meta.env.VITE_URL_API;

function FormsAddCap() {
  const [nombreGorra, setNombreGorra] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [foto, setFoto] = useState(null);
  const [selectTalla, setSelectTalla] = useState("");
  const [cantidadMulti, setCantidadMulti] = useState("");
  const [cantidadUni1, setCantidadUni1] = useState([]);

  const handleNombreGorra = (e) => setNombreGorra(e.target.value);
  const handlePrecio = (e) => setPrecio(e.target.value);
  const handleDescripcion = (e) => setDescripcion(e.target.value);
  const handleType = (e) => setTipo(e.target.value);
  const handleBrand = (e) => setMarca(e.target.value);
  const escojerTalla = (event) => setSelectTalla(event.target.value);
  const handleCantidadMulti = (e) => setCantidadMulti(e.target.value);
  const handleCantidadUni1 = (e, index) => {
    const newCantidadUni1 = [...cantidadUni1];
    newCantidadUni1[index] = e.target.value;
    setCantidadUni1(newCantidadUni1);
  };

  const validar = async () => {
    if (nombreGorra === "") {
      alert("Nombre de la gorra no definido");
      return;
    }
    if (precio === "") {
      alert("El Precio no está definido");
      return;
    }
    if (descripcion === "") {
      alert("La descripción no está definida");
      return;
    }
    if (tipo === "") {
      alert("No se ha seleccionado el Tipo de Gorra");
      return;
    }
    if (marca === "") {
      alert("La marca no ha sido definida");
      return;
    }
    if (selectTalla === "multitalla" && cantidadMulti === "") {
      alert("Espacios de la(s) Talla(s) para multitalla");
      return;
    }
    if (selectTalla === "unitalla" && cantidadUni1.length <= 4) {
      alert("Espacios de la(s) Talla(s) para unitalla");
      return;
    }
    if (!foto) {
      alert("No se ha cargado una foto");
      return;
    }
    console.log(selectTalla);
    if (selectTalla === "unitalla") {
      for (let i = 2; i < 7; i++) {
        const formData = new FormData();
        formData.append("categoria_id", marca);
        formData.append("name", nombreGorra);
        formData.append("price", precio);
        formData.append("created_by", "Panchito");
        formData.append("image", foto);
        formData.append("talla", i);
        formData.append("tipo", tipo);
        formData.append("descripcion", descripcion);

        await fetch(`${url}api/v1/cap`, {
          method: "POST",
          body: formData,
        })
          .then(async (response) => {
            if (response.ok) {
              const data = await response.json();
              await fetch(`${url}api/v1/inventary`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  cantidad: Number(cantidadUni1[i - 2]),
                  gorra_id: Number(data.id),
                  talla_id: Number(i),
                  created_by: "Panchito",
                }),
              })
                .then((data) => console.log(data))
                .catch((error) => console.error(error));
              console.log(data.id, data.categoria_id, data.talla);
            } else {
              const error = await response.json();
              alert(`Error: ${error.message}`);
              console.log(error);
            }
          })
          .catch((error) => {
            alert(`Error: ${error.message}`);
            console.log(error);
          });
      }
      alert("Producto creado con éxito");
    } else {
      const formData = new FormData();
      formData.append("categoria_id", marca);
      formData.append("name", nombreGorra);
      formData.append("price", precio);
      formData.append("created_by", "Panchito");
      formData.append("image", foto);
      formData.append("talla", 1);
      formData.append("tipo", tipo);
      formData.append("descripcion", descripcion);

      await fetch(`${url}api/v1/cap`, {
        method: "POST",
        body: formData,
      })
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            console.log("Cap Data:", data);
            alert("Producto creado con éxito");

            await fetch(`${url}api/v1/inventary`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cantidad: Number(cantidadMulti),
                gorra_id: Number(data.id),
                talla_id: 1,
                created_by: "Panchito",
              }),
            })
              .then(async (response) => {
                if (response.ok) {
                  const responseData = await response.json();
                  console.log("Inventary Data:", responseData);
                } else {
                  const error = await response.json();
                  alert(`Error: ${error.message}`);
                  console.log("Inventary Error:", error);
                }
              })
              .catch((error) => {
                alert(`Error: ${error.message}`);
                console.error("Fetch Error:", error);
              });
          } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
            console.log(error);
          }
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
          console.log(error);
        });
    }
  };

  return (
    <Form className={styles.formsAddCap}>
      <FormGroup row className={styles.formGroup}>
        <Col sm={12}>
          <ImputRegistro
            inputText="Gorra"
            inputType="text"
            onChange={handleNombreGorra}
            className={styles.inputField}
          />
        </Col>
      </FormGroup>

      <FormGroup row className={styles.formGroup}>
        <Col sm={12}>
          <ImputRegistro
            inputText="Precio"
            inputType="number"
            onChange={handlePrecio}
            className={styles.inputField}
          />
        </Col>
      </FormGroup>

      <FormGroup row className={styles.formGroup}>
        <Col sm={12}>
          <ImputRegistro
            inputText="Descripcion"
            inputType="textarea"
            onChange={handleDescripcion}
            className={`${styles.inputField} ${styles.textarea}`}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Label for="exampleSelect" className={styles.label}>
          TIPO DE GORRA
        </Label>
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          value={tipo}
          onChange={handleType}
          className={styles.inputField}>
          <option value="" disabled>
            Tipo de Gorra
          </option>
          <option value="plana">PLANA</option>
          <option value="curva">CURVA</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="exampleSelect" className={styles.label}>
          MARCA
        </Label>
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          value={marca}
          onChange={handleBrand}
          className={styles.inputField}>
          <option value="" disabled>
            Marca
          </option>
          <option value={1}>New Era</option>
          <option value={2}>47</option>
          <option value={3}>Goorin Bros.</option>
          <option value={4}>Mr. Kash</option>
          <option value={5}>Ranch & Corral</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="exampleFile" className={styles.label}>
          FOTO
        </Label>
        <Input
          id="exampleFile"
          name="file"
          type="file"
          className={`${styles.inputField} ${styles.fileInput}`}
          onChange={(e) => setFoto(e.target.files[0])}
        />
        <FormText>Este apartado es para subir la foto de tu producto.</FormText>
      </FormGroup>

      <FormGroup>
        <Label for="exampleSelect" className={styles.label}>
          ESTILO DE TALLA
        </Label>
        <Input
          id="exampleSelect"
          name="select"
          type="select"
          value={selectTalla}
          onChange={escojerTalla}
          className={styles.inputField}>
          <option value="" disabled>
            Tipo de Talla
          </option>
          <option value="multitalla">Multitalla</option>
          <option value="unitalla">Unitalla</option>
        </Input>
      </FormGroup>

      <FormGroup className={styles.textCenter}>
        {selectTalla === "" ? (
          <h3>Selecciona un tipo de Talla</h3>
        ) : selectTalla === "unitalla" ? (
          <TallasCap
            q1={(e) => handleCantidadUni1(e, 0)}
            q2={(e) => handleCantidadUni1(e, 1)}
            q3={(e) => handleCantidadUni1(e, 2)}
            q4={(e) => handleCantidadUni1(e, 3)}
            q5={(e) => handleCantidadUni1(e, 4)}
          />
        ) : (
          <Unitalla onChange={handleCantidadMulti} />
        )}
      </FormGroup>

      <FormGroup row className={styles.textCenter}>
        <Col sm={12}>
          <BottomRegistro botonRegistro="Agregar" onClickF={validar} />
        </Col>
      </FormGroup>
    </Form>
  );
}

export default FormsAddCap;
