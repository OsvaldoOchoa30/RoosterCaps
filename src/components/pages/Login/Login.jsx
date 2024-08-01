import CompleteLogo from '../../molecules/CompleteLogo/CompleteLogo'
import Footer from '../../molecules/Footer/Footer'

import FormsLogin from '../../molecules/FormsLogin/FormsLogin'

import styles from "./Login.module.css"

import { Container, Row } from 'reactstrap';


import React from 'react'

function Login() {
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
      <CompleteLogo/>
      <FormsLogin/>
      </Row>
    </Container>

    <Footer/>

    </>
    
  )
}

export default Login