import React, { createContext, useState } from 'react';
import run from '../config/gemini';


export const context = createContext();

const ContextProvider = (props) => {
  const [input, setInput]=useState("")
  const [recentPrompt,setRecentPrompt]= useState("")
  const [prevPrompts,setPrevPrompts] =useState([])
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result,setResult] = useState("")

  const delayPara =(index,nextWord)=>{
    setTimeout(function(){
      setResult(prev=>prev+nextWord)
    },70*index)
  }
  const newChat=()=>{
    setLoading(false)
    setShowResult(false)
    setPrevPrompts([])
  }
  const onSent = async (prompt) => {
    if(input!==""){
      setResult("")
      setLoading(true);
      setShowResult(true)
      let response;
      if(prompt!== undefined){
         response= await  run(prompt);
         setRecentPrompt(prompt)

      }
      else{

        setPrevPrompts(prev=>[...prev ,input])
        setRecentPrompt(input)
        response = await run(input)
      }  
      try {
        const response = await run(input);
        let responseArray= response.split("**");
        let newResponse="";
        for(let i=1;i<responseArray.length;i++){
          if(i ===0 ||i%2!=1){
            newResponse +=responseArray[i]
          }
          else{
            newResponse += "<b>" + responseArray[i] + "</b>"
          }
        }
        let newResponse2= newResponse.split("*").join("</br>")
        console.log (newResponse)
        let newResponseArray=newResponse2.split(" ")
        for(let i=0; i <newResponseArray.length;i++){
          const nextWord =newResponseArray[i]
          delayPara(i , nextWord+" ")
        }
  
      } catch (error) {
        console.error("Error sending prompt:", error);
      } finally {
        setLoading(false);
        setInput("")
      }
    }
    
  };
  // onSent("how is taha")
  const contextValue = {
    prevPrompts,
    setRecentPrompt,
    setPrevPrompts,
    input, 
    setInput,
    showResult,
     setShowResult,
    recentPrompt,
    onSent, 
    loading,
     setLoading,
    result,
    setResult,
    run,
    onSent,
    newChat
  };

  return (
    <context.Provider value={contextValue}>
      {props.children}
    </context.Provider>
  );
};


export default ContextProvider;
