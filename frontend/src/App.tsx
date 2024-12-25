import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [message, setMessage] = useState(["Hi There"])
  const wsRef = useRef()

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080")
    ws.onmessage = (event) =>{
      setMessage(m => [...m,event.data])
    }
    wsRef.current = ws
    ws.onopen = () =>{
      ws.send(JSON.stringify({
        type: "join",
        payload : {
          roomId : "red"
        }
      }))
    }
    return () =>{
      ws.close()
    }
  }, [])
  

  return (
    <>
    <div className='h-screen flex flex-col '>
      <div className='h-[80vh] bg-red-800'>
      {message.map(message => <div className='text-white bg-black rouunded-full p-4'> {message} </div> 
        )}
      </div>
        <div className='flex'>
          <input id='message' type="text" className='w-full p-4 border border-blue-700 shadow-inner' placeholder='Message' />
          <button className='bg-purple-600 text-white p-4 rounded-full w-60'
                  onClick={() =>{
                    const message = document.getElementById("message")?.value
                    wsRef.current.send(JSON.stringify({
                      type : "chat",
                      payload: {
                        message: message
                      }
                    }))
                  }}  
                  >Send Message</button>
        </div>
     
    </div>
    </>  
  )
}

export default App
