import React from 'react'
import styles from './TituloRegistro.module.css'

function TituloRegistro({titulo}) {
  return (
    <h2 className={styles.h2}>{titulo}</h2>
  )
}

export default TituloRegistro