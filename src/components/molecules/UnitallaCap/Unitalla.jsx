import React from 'react'

import ImputRegistro from '../../atoms/ImputRegistro/ImputRegistro'
import ParrafoRegistro from '../../atoms/ParrafoRegistro/ParrafoRegistro'

function Unitalla({quantity, onChange}) {
  return (
    <div style={{justifyContent: "center", display:"flex"}}>
        <div style={{width:"15em",display:'flex', margin:"20px"}}>
        <ParrafoRegistro registro="Multitalla"/>
        <ImputRegistro Input inputText={quantity} inputType="number" onChange={onChange}/>
        </div>
    </div>
  )
}

export default Unitalla