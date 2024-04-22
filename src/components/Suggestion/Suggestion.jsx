import React, { useContext } from 'react'
import "./Suggestion.css"
import { Context } from '../../context/Context'

function Suggestion({content, img}) {
const {setInput} = useContext(Context)

    return (
        <div className='card' onClick={()=>setInput(content)}>
            <p>{content}</p>
            <img src={img} alt="" />
        </div>
    )
}

export default Suggestion
