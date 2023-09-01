import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FormControl, Input, InputLabel } from '@mui/material';
import './App.css';
import db from "./firebase";
import Message from "./Message";
import { toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import FlipMove from 'react-flip-move';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';


function App() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    
  ]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    db.collection("messages").orderBy('timestamp','desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, [])

  useEffect(() => {
    setUsername(prompt("Enter your name"));
  }, [])

  const sendMessage = (event) => {
    event.preventDefault();
    
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
     
    setInput('');
    document.documentElement.scrollTop=0;
  }

  return (
    <div className="App">
      <img className="messenger" src="messenger.png" alt='Messenger image'></img>
      <h1>Hello {username}</h1>
      
      <form className="app_form">
      <FormControl className='app_formcontrol'>
      
      <Input className='app_input' placeholder='Enter the message...' value={input} onChange={event => setInput(event.target.value)}/>

      <IconButton className='app_iconbutton' disabled={!input} variant='outlined' color='primary' type='submit' onClick={sendMessage}>
       <SendIcon/>
      </IconButton>

      
      </FormControl>
      </form>  
 
      <FlipMove className='msgtop'>
      {
        messages.map(({id, message}) => (
          <Message key={id} username={username} message={message} />
          
        ))
      }
      </FlipMove>
      
    </div>
  );
}

export default App;
