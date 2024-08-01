import CompleteLogo from "../../molecules/CompleteLogo/CompleteLogo";
import FormsRegistro from "../../molecules/FormsRegistro/FormsRegistro";
import Footer from "../../molecules/Footer/Footer";



import { Container, Row } from "reactstrap";

function Registro() {
  return (
    <>
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
          xs="1"
          sm="2"
        >
          <CompleteLogo />
          <FormsRegistro />
        </Row>
      </Container>


      <Footer />
    </>
  );
}

export default Registro;
