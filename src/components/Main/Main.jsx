import React, { useContext, useState, useEffect } from 'react'
import {assets} from "../../assets/assets"
import "./Main.css"
import {Suggestion} from '../index'
import { Context } from '../../context/Context'
import Help from '../Help/Help'


function Main() {

  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context)
  const [username, setUsername] = useState("Learner")
  useEffect(() => {
    let storedUserName = localStorage.getItem("userName")
    if (storedUserName && storedUserName.length > 0) {
      setUsername(storedUserName)
    }
  }, [])
  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    localStorage.setItem("userName", newUsername);
  };
  

  
  function openMenu(){
    document.querySelector(".sidebar").classList.toggle("open-menu");
}

  return (
    <div className='main'>
      <div className="nav">
        <p>Smart Assist</p>
        <img src={assets.user_icon} alt="" onClick={()=>openMenu()}/>
      </div>
      <section className='section'>
        {!showResult
        ? 
        <>
        <div className="h1">
        <h1>Hello, 
          <input 
            type="text"
            value={username}
            onChange={handleUsernameChange}
            /></h1>
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
          content={"How to enhance code readibility."} 
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
            <input 
            type="input" 
            placeholder='Enter a prompt here' 
            onChange={(e)=>{
              setInput(e.target.value)
                }
            } 
            value={input}/>

            <img src={assets.send_icon} alt="" onClick={()=>onSent()}/>
            </div>
            <p>The results may <strong>inaccurate*</strong></p>
        </div>
      </section>
      
    </div>
  )
}

export default Main
