import { createContext } from "react";
import { useState } from "react";
import runChat from "../Config/geminiApi";

export const Context = createContext();


const ContextProvider = (props) => {

    const [input, setInput] = useState("")
    const [recentPrompt, setRecentPrompt] = useState("")
    const [previousPrompt, setPreviousPrompt] = useState([])
    const [showResult, SetshowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState("")

    function TextFormatter(text) {
        const boldRegex = /\*\*(.*?)\*\*/g;
        const BrBoldRegex = /\*\s*\*\*(.*?)\*\*/g;
        const starBrRegex = /\*(.*?)/g;
        const brRegex = /(\n)/g;
        const codeRegex = /```([^`]*?)```/gs;
        const formattedText = text
            .replace(codeRegex, (_, code) => `<pre><code>${code}</code></pre>`)
            .replace(boldRegex, '<strong>$1</strong>')
            .replace(BrBoldRegex, '<br><strong>$1</strong>')
            .replace(starBrRegex, `>>`)
            .replace(brRegex, "<br>")

        return formattedText;
    }
    function verifyError(error) {
        console.log("error is:", error)
        error = String(error)
        if (error.includes("Candidate was blocked due to SAFETY")) {
            delayPara("Oops! Your input has been blocked due to violating our <a href='google.com'>terms and conditions</a> for safety reasons. Please ensure that your prompt complies with our guidelines before submitting.")
        }
        if (error.includes("Failed to fetch")) {
            delayPara("The server is not responding. Please try again later.")
        }
        if (error.includes("Candidate was blocked due to RECITATION")) {
            delayPara("Unauthorized repetition detected. Please refrain from reciting content as it violates our guidelines.")
        }
    }
    const delayPara = (formattedText) => {
        let newFormattedText = formattedText.split(" ")
        newFormattedText.forEach((nextWord, index) => {
            setTimeout(() => {
                setResultData(prev => prev + " " + nextWord)
            }, 75 * index);
        })
    }

    const onSent = async (prompt) => {
        // if (input.trim() === "") {
        //     return
        // }
        setResultData("")
        setLoading(true)
        SetshowResult(true)
        let response;
        let actualPrompt = prompt? prompt: input;
        
            setRecentPrompt(actualPrompt)
            setPreviousPrompt(prev => [actualPrompt,...prev])
            try {
                response = await runChat(actualPrompt)
                let formattedText = TextFormatter(response)
                delayPara(formattedText)
            } catch (error) {
                verifyError(error)
            }
            finally {
                setLoading(false)
                setInput("")

            }
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

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}
export default ContextProvider;