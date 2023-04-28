import React from 'react'
import './Boton.css'

export const Boton = (props) => {
    const styleBoton = {
        width: props.width || "200px",
        height: props.height || "40px"
    }

    return (
        <button className="boton" style={{ ...props.style, ...styleBoton }} onClick={props.onClick} type='button'>{props.texto}</button>
    )
}
