import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';

function NotesDetail() {
  
  const location = useLocation();
  const title  = location.state.title;
  const content = location.state.content;

  return (
    <>
        <Header
        heading = {title}
        />

        <p>{content}</p>
    </>
  )
}

export default NotesDetail;