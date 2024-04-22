import React, { useContext, useEffect} from 'react'
import { useState } from 'react'
import './Sidebar.css'
import { assets } from "../../assets/assets"
import { Context } from '../../context/Context'

function Sidebar() {

    const [extended, setExtended] = useState(false)
    const { onSent, previousPrompt, setRecentPrompt, setPreviousPrompt } = useContext(Context)
    useEffect(() => {
        const previousPrompt = JSON.parse(localStorage.getItem("previousPrompt"));
        if (previousPrompt && previousPrompt.length > 0) {
            setPreviousPrompt(previousPrompt)
        }
    }, [])
    useEffect(() => {
        localStorage.setItem("previousPrompt", JSON.stringify(previousPrompt));
    }, [previousPrompt])


    return (
        <div className='sidebar'>
            <div className="top">
                <img src={assets.menu_icon} alt="" className='menu' onClick={() => setExtended(prev => !prev)} />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended ?
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {
                            previousPrompt.map((item, index) => {
                                return (
                                    <div className="recent-entry" key={index} onClick={() => onSent(item)}>
                                        <img src={assets.message_icon} alt="" />
                                        <p>{item.slice(0, 15)}...</p>
                                    </div>
                                )
                            })
                        }
                    </div> : null}
            </div>
            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Help &nbsp; &nbsp; &nbsp;</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Activity</p> : null}

                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Setting</p> : null}

                </div>
            </div>
        </div>
    )
}

export default Sidebar
