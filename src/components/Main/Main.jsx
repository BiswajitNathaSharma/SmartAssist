import React from 'react'
import {assets} from "../../assets/assets"
import "./Main.css"
import Suggestion from '../Suggestion/Suggestion'


function Main() {
  return (
    <div className='main'>
      <div className="nav">
        <p>Smart Assist</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <section className='section'>
        <div className="h1">
        <h1>Hello, Learner</h1>
        <h1>How can I help you today?</h1>
        </div>

        <div className="cards">
          <Suggestion
          content={"Suggest beautiful places to see on a upcoming road trip in India."} 
          img={assets.compass_icon}
          />

          <Suggestion
          content={"Briefly summerize this concept: urban planning"} 
          img={assets.bulb_icon}
          />

          <Suggestion
          content={"Write a mail to manager, asking for leave."} 
          img={assets.message_icon}
          />

          <Suggestion
          content={"How to center a div."} 
          img={assets.code_icon}
          />

        </div>
        <div className="prompt-box">
            <input type="text" placeholder='Enter a prompt here' />

            <div className="img">
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            <img src={assets.send_icon} alt="" />
            </div>
        </div>
            <p>The result may inaccurate</p>
      </section>
    </div>
  )
}

export default Main
