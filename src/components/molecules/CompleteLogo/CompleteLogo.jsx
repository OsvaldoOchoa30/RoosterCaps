import React from 'react'
import LogoSingIng from '../../atoms/LogoSingIng/LogoSingIng'
import TituloLogo from '../../atoms/TituloLogo/TituloLogo'

import styles from './CompleteLogo.module.css'

function CompleteLogo() {
  return (
    <div className={styles.container}> 
        <LogoSingIng/> 
        <TituloLogo titulo="ROOSTER CAPS"/>
        
    </div>
  )
}


//en la linea 9, despues del punto lo tengo que rellenar
export default CompleteLogo