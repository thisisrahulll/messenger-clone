import React, { forwardRef } from 'react';
import Card from '@mui/material/Card';
import "./Message.css";
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

const Message = forwardRef(({username, message}, ref) => {
  const isUser = username===message.username;
  return (
    <div ref={ref} className={`message ${isUser && 'message__user'}`}>
    
    <Card className={isUser? "message__userCard" : "message__guestCard"}>
      <CardContent >
        <Typography 
        variant='h5'
        component='h2'>
        {!isUser && (message.username||"unknown") + ":"} {message.message}
        </Typography>
        
     
      </CardContent>
    
    </Card>
    </div>
    

  
  )
})

export default Message