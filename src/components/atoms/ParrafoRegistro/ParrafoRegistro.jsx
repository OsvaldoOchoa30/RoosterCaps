import React from 'react'

import styles from './ParrafoRegistro.module.css'

function ParrafoRegistro({registro}) {
  return (
    <h4 className={styles.parrafo}>{registro}</h4>
  )
}

export default ParrafoRegistro