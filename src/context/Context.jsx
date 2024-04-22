import { createContext } from "react";
import { useState } from "react";
import runChat from "../Config/geminiApi";

export const Context = createContext();


const ContextProvider = (props) =>{
    
        const [input, setInput] = useState("")
        const [recentPrompt, setRecentPrompt] = useState("")
        const [previousPrompt, setPreviousPrompt] = useState([])
        const [showResult, SetshowResult] = useState(false)
        const [loading, setLoading] = useState(false)
        const [resultData, setResultData] = useState("")

        function TextFormatter(text) {
            const boldRegex = /\*\*(.*?)\*\*/g;
            const brRegex = /\*(.*?)/g;
            const codeRegex = /```([^`]*?)```/gs;

            const formattedText = text
                .replace(codeRegex, (_, code) => `<pre><code>${code}</code></pre>`)
                .replace(boldRegex, '<br><strong>$1</strong>')
                .replace(brRegex, '<br>$1')
            
                return formattedText;
        }
        const delayPara = (formattedText)=>{
            let newFormattedText = formattedText.split(" ")
            newFormattedText.forEach((nextWord, index)=>{
                setTimeout(() => {
                    setResultData(prev => prev + " " + nextWord)
                }, 75*index);
            })
        }

    const onSent = async (prompt) =>{
        // if (input.trim() === "") {
        //     return
        // }
        setResultData("")
        setLoading(true)
        SetshowResult(true)
        let response;
        if (prompt) {
            response = await runChat(prompt)
            setRecentPrompt(prompt)
        }
        else{
            setRecentPrompt(input)
            setPreviousPrompt(prev => [...prev, input])
            response = await runChat(input)
        }
        let formattedText = TextFormatter(response)
        delayPara(formattedText)
        setLoading(false)
        setInput("")
    }

    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent,
        recentPrompt,
        setRecentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
    }

    return(
        <Context.Provider value = {contextValue}>
            {props.children}
        </Context.Provider>
        )
}
export default ContextProvider;