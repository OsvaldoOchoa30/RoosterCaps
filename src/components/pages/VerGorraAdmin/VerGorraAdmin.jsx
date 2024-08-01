import React, { useState, useEffect } from "react";
import ImputRegistro from "../../atoms/ImputRegistro/ImputRegistro";
import BottomRegistro from "../../atoms/ButtomRegistro/ButtomRegistro";
import Imagen from "../../atoms/Imagen/Imagen";
import TallasCap from "../../molecules/TallasCap/TallasCap";
import Unitalla from "../../molecules/UnitallaCap/Unitalla";
import NavBarGlobal from "../../molecules/NavBarGlobal/NavBarGlobal";
import { Form, FormGroup, Col, Label, Input, FormText } from "reactstrap";
import styles from "./VerGorraAdmin.module.css";
import { useParams } from "react-router-dom";
const url = import.meta.env.VITE_URL_API;
function VerGorraAdmin() {
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [datas, setDatas] = useState({});
  const [datos, setDatos] = useState({});
  const [selectMarca, setSelectMarca] = useState(1);
  const [selectType, setSelectType] = useState("");
  const [tallas, setTallas] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [foto, setFoto] = useState(null);
  const [precice, setPrecie] = useState(0);

  const handleCantidadUni1 = (e, index) => {
    const newCantidadUni1 = [...tallas];
    newCantidadUni1[index] = e.target.value;
    setTallas(newCantidadUni1);
  };

  const tipos = ["Curva", "Plana"];
  const marcas = [
    "New Era",
    "47",
    "Goorin Bros.",
    "Mr. Kash",
    "Ranch & Corral",
  ];
  const eliminarCap = async () => {
    const response = await fetch(`${url}api/v1/cap/${datos.name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      alert("error");
      throw new Error("Error fetching data");
    }
    alert("Producto eliminado del stock");
  };
  const putCaps = async () => {
    if (datos.talla_id == 1) {
      const formData = new FormData();
      formData.append("categoria_id", Number(selectMarca));
      formData.append("name", nombre);
      formData.append("price", precice);
      formData.append("updated_by", "Panchito");
      formData.append("image", foto);
      formData.append("talla", 1);
      formData.append("tipo", selectType);
      formData.append("descripcion", descripcion);
      formData.append("name2", datos.name);
      const response = await fetch(`${url}api/v1/cap/`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const response2 = await fetch(`${url}api/v1/inventary/${datos.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({cantidad:tallas[0],updated_by:"Pancho",talla_id:1}),
      });

      if (!response2.ok) {
        throw new Error("Error fetching data");
      }
      alert("Producto modificado");
      const data = await response.json();
    }else{
      for (let i = 0; i < tallas.length; i++) {
        const formData = new FormData();
      formData.append("categoria_id", Number(selectMarca));
      formData.append("name", nombre);
      formData.append("price", precice);
      formData.append("updated_by", "Panchito");
      formData.append("image", foto);
      formData.append("talla", (i+2));
      formData.append("tipo", selectType);
      formData.append("descripcion", descripcion);
      formData.append("name2", datos.name);
      const response = await fetch(`${url}api/v1/cap/`, {
        method: "PATCH",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const response2 = await fetch(`${url}api/v1/inventary/${datos.id+i}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({cantidad:tallas[i],updated_by:"Pancho",talla_id:i+2}),
      });

      if (!response2.ok) {
        throw new Error("Error fetching data");
      }
      }
      alert("Producto modificado");
    }
  };
  const datasGet = async () => {
    try {
      const response = await fetch(`${url}api/v1/cap/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      setDatos(data);
      const response2 = await fetch(
        `${url}api/v1/inventary/caps/${data.name}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response2.ok) {
        throw new Error("Error fetching data");
      }

      const data2 = await response2.json();
      setDatas(data2);

      return true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    datasGet();
    return () => {
      console.log("Componente desmontado");
    };
  }, []);

  const mycap = [
    {
      Type: "Curva",
      Brand: "New Era",
      Talla: "multitalla",
    },
  ];

  if (!datos || !datas) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <NavBarGlobal />
      <div className={styles.verGorraAdmin}>
        {mycap.map((cap) => {
          const marcasFiltradas = marcas.filter((marca) => marca !== cap.Brand);
          const tiposFiltrados = tipos.filter((tipo) => tipo !== cap.Type);

          return (
            <React.Fragment key={datos.name}>
              <div className={styles.imagenOficial}>
                <Imagen imagenOficial={datos.imagen} />
              </div>
              <Form className={styles.rightColumn}>
                <FormGroup className={styles.formGroup}>
                  <Col sm={10}>
                    <Input
                      placeholder={datos.name}
                      type="text"
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </Col>
                </FormGroup>

                <FormGroup className={styles.formGroup}>
                  <Col sm={10}>
                    <ImputRegistro
                      onChange={(e) => setPrecie(e.target.value)}
                      inputText={datos.price}
                      inputType="number"
                    />
                  </Col>
                </FormGroup>

                <FormGroup className={styles.formGroup}>
                  <Col sm={10}>
                    <Label for="exampleText"></Label>
                    <Input
                      id="exampleText"
                      name="text"
                      onChange={(e) => setDescripcion(e.target.value)}
                      type="textarea"
                      placeholder={datos.descripcion}
                    />
                  </Col>
                </FormGroup>

                <FormGroup className={styles.formGroup}>
                  <Col sm={10}>
                    <Label for="exampleSelect">TIPO DE GORRA</Label>
                    <Input
                      id="exampleSelect"
                      name="select"
                      type="select"
                      onChange={(e) => setSelectType(e.target.value)}>
                      <option value="plana">PLANA</option>
                      <option value="curva">CURVA</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup className={styles.formGroup}>
                  <Col sm={10}>
                    <Label for="exampleSelect">MARCA</Label>
                    <Input
                      id="exampleSelect"
                      name="select"
                      type="select"
                      onChange={(e) => setSelectMarca(e.target.value)}>
                      <option value={1}>New Era</option>
                      <option value={2}>47</option>
                      <option value={3}>Goorin Bros.</option>
                      <option value={4}>Mr. Kash</option>
                      <option value={5}>Ranch & Corral</option>
                    </Input>
                  </Col>
                </FormGroup>

                <FormGroup className={styles.formGroup}>
                  <Col sm={10}>
                    <Label for="exampleFile">FOTO</Label>
                    <Input
                      id="exampleFile"
                      name="file"
                      type="file"
                      onChange={(e) => setFoto(e.target.files[0])}
                    />
                    <FormText>Actualizar la foto actual.</FormText>
                  </Col>
                </FormGroup>
                <>
                  <h4>Cantidad por talla</h4>
                  {datos.talla_id == 2 ? (
                    <TallasCap
                      q1={(e) => handleCantidadUni1(e, 0)}
                      q2={(e) => handleCantidadUni1(e, 1)}
                      q3={(e) => handleCantidadUni1(e, 2)}
                      q4={(e) => handleCantidadUni1(e, 3)}
                      q5={(e) => handleCantidadUni1(e, 4)}
                    />
                  ) : (
                    <Unitalla onChange={(e) => handleCantidadUni1(e, 0)} />
                  )}
                </>

                <FormGroup className={styles.formGroup}>
                  <Col sm={10}>
                    <div className={styles.btnGroup}>
                      <BottomRegistro
                        botonRegistro="Modificar"
                        onClickF={putCaps}
                        className={styles.modifyButton}
                      />
                      <BottomRegistro
                        botonRegistro="Eliminar"
                        onClickF={eliminarCap}
                        className={styles.deleteButton}
                      />
                    </div>
                  </Col>
                </FormGroup>
              </Form>
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
}

export default VerGorraAdmin;
