import React from 'react'
import "./Suggestion.css"
function Suggestion({content, img}) {
    return (
        <div className='card'>
            <p>{content}</p>
            <img src={img} alt="" />
        </div>
    )
}

export default Suggestion
