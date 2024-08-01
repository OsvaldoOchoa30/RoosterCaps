import React from 'react'

import ImputRegistro from '../../atoms/ImputRegistro/ImputRegistro'
import ParrafoRegistro from '../../atoms/ParrafoRegistro/ParrafoRegistro'


function TallasCap({q1, q2, q3, q4, q5, onChanceXD}) {
    //usar .map

  return (
    <>
    <div style={{justifyContent: "center", display:"flex"}}>

        <div style={{width:"10em",display:'flex', margin:"15px"}}>
        <ParrafoRegistro registro="7:"/>
        <ImputRegistro Input inputText={q1} inputType="number" onChange={q1}/>
        </div>

        <div style={{width:"10em",display:'flex', margin:"15px"}}>
        <ParrafoRegistro registro="7 1/8:"/>
        <ImputRegistro Input inputText={q2} inputType="number" onChange={q2}/>
        </div>

        <div style={{width:"10em",display:'flex', margin:"15px"}}>
        <ParrafoRegistro registro="7 1/4:"/>
        <ImputRegistro Input inputText={q3} inputType="number"onChange={q3}/>
        </div>

        <div style={{width:"10em",display:'flex', margin:"15px"}}>
        <ParrafoRegistro registro="7 1/2:"/>
        <ImputRegistro Input inputText={q4} inputType="number" onChange={q4}/>
       </div>

       <div style={{width:"10em",display:'flex', margin:"15px" }}>
        <ParrafoRegistro registro="7 3/4:"/>
        <ImputRegistro Input inputText={q5} inputType="number" onChange={q5}/>
        </div>

    </div>
    </>
    
  )
}

export default TallasCap