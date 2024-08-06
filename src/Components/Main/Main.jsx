import './Main.css'
import assets from '../../assets/assets'
import { context } from '../../context/Context'
import { useContext } from 'react'
const Main =()=>{
    const{recentPrompt,input, 
        setInput,showResult,loading,result,onSent}= useContext( context)
    return (
        <>
        <div className ="main ">
            <div className="nav">
                <p>gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
          {!showResult?<>
            <div className="greeting">
                    <p><span>hello Taha</span></p>
                    <p>how can i help you Today?</p>
                </div>
                <div className="cards">
                    <div className="card">
                    <p>suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                    </div>
                    <div className="card">
                    <p>briefly summarize this concept :urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                    </div>
                    <div className="card">
                    <p>brainstorm team activity for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                    <p>improve the reliabilty of the following code </p>
                    <img src={assets.code_icon} alt="" />
                    </div>
                    
                </div></>:<div  className="result">
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="" />
                            {loading?<div  className='loader'>
                                <hr />
                                <hr />
                                <hr />
                            </div>
                            :<p dangerouslySetInnerHTML={{__html:result}}></p>}
                            
                        </div>
                        
                        </div>} 
                
                <div className="main-bottom">
                    <div className="search-bar">
                        <input onChange ={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='please enter your prompt' />
                        <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                       {input&&<img  onClick={()=>onSent()}src={assets.send_icon} alt="" />} 
                    </div>
                    </div>
                    
                    <p className="bottom-info">
                        gemini may display inaccorate info ,including about people ,s o double check its response. your privacy and gemini app
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}
export default Main 
