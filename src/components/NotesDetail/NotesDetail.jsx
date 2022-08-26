import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';

function NotesDetail() {
  
  const location = useLocation();
  const title  = location.state.title;
  const content = location.state.content;

  return (
    <div>
      <Header
      heading = {title}
      />

      <div
      style={{
      backgroundColor:"rgb(214, 180, 214)",
      borderRadius:"2rem",
      color: "whitesmoke",
      width: "90%",
      padding:"2rem",
      margin:"auto",
      marginTop: "4rem",
      }}>
        <p>{content}</p>
      </div>      
    </div>
  )
}

export default NotesDetail;