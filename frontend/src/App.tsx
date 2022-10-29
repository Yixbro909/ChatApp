import React, { useEffect, useState } from 'react';
import './App.css';
import DisplayMessages from './components/DisplayMessages';
import io,{ Socket } from 'socket.io-client';

//connect to socket
const socket: Socket<any> = io('http://localhost:9000')

function App() {
    
  // app statew
  const [value, setValue] = useState<string>('');
  const [messages, setMessages] = useState<any>([]);
  const [username, setUsername] = useState<string>('');

  //send message
  function sendMessage(e: React.SyntheticEvent){
    e.preventDefault();
     
    if(value && username) socket.emit("chat", {message: value, username, timestamp: new Date()})
    
    //clear input
    const msgNode = document.querySelector('.message') as HTMLInputElement;
    msgNode.value = ''
    setValue('')
    msgNode.focus()


  }


  //receive message
useEffect(() => {
     socket.on('chat', (data: string) => {
       setMessages([...messages, data])
     })

     return () => {
        //scrollIntoView
        document.querySelector('.messages')?.lastElementChild?.scrollIntoView(); 
     }

  }, [messages])
  
  return (
    <div className="App">
      <div className='container mx-auto p-5 w-[70%] shadow-md m-5 bg-white'>
        <div className="text-5xl text-center mb-5 font-bold text-primary">My Messages</div>

        <hr className='mb-5' />
         
         {/* display messages */}
         <DisplayMessages messages={messages} username={username} />  

         <form action="" className='input-group' onSubmit={sendMessage}>
          <input type="text" className='form-control ' placeholder='username' onChange={(e) => setUsername(e.target.value)}/>
           <input type="text" className="form-control message" placeholder='write a message ...' onChange={(e) => setValue(e.target.value)} />
           <button className='btn bg-primary text-white'>send message</button>
         </form>
      </div>
    </div>
  );
}

export default App;
