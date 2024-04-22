import React, { useContext } from 'react'
import {assets} from "../../assets/assets"
import "./Main.css"
import {Suggestion} from '../index'
import { Context } from '../../context/Context'


function Main() {

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput
  } = useContext(Context)


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        onSent(); // Call onSent function when Enter is pressed
    }
};
  return (
    <div className='main'>
      <div className="nav">
        <p>Smart Assist</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <section className='section'>
        {!showResult
        ? 
        <>
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
        </>: 
          <div className='result'>
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.bot_icon} alt="" />
              {
                loading?
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                </div>
                :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
            </div>
          </div>
          }
        <div className="prompt-box">
          <div className="input">
            <input type="text" placeholder='Enter a prompt here' onChange={(e)=>setInput(e.target.value)} value={input}/>

            <div className="img">
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            <img src={assets.send_icon} alt="" onClick={()=>onSent()}/>
            </div>
            </div>
            <p>The results may <strong>inaccurate*</strong></p>
        </div>
      </section>
    </div>
  )
}

export default Main
