import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function NotesDetail() {
  
  const location = useLocation();
  const title  = location.state.title;
  const content = location.state.content;

  return (
    <div>
      <Header
      heading = {title}
      />
      <CardContent
        style={{ 
          backgroundColor:"rgb(214, 180, 214)",
          borderRadius:"2rem",
          width: "90%",
          padding:"2rem",
          margin:"auto",
        marginTop: "4rem",
        }}>
        <Typography> 
          
         
          value={content}
        </Typography>
      

      </CardContent>
    </div>
  )
}

export default NotesDetail;