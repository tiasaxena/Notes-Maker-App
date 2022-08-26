import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FileOpenIcon from '@mui/icons-material/FileOpen';

export default function TopicCard({ topic, subject_id, handleDelete, handleEdit }) {
  const [newTitle, setNewTitle] = useState(topic.topicName);

  const handleChange = (e) => {
    e.preventDefault();
    setNewTitle(e.target.value);
    
  };
  return (
    <div 
    style={{textAlign: "center"}}>
      <div
      style={{marginBottom: "1rem"}}>
      <TextField
          id="outlined-password-input"
          type="text"
          value={newTitle}
          onChange={handleChange} 
          required
      />
      
      <Button 
      type="submit" 
      variant="outlined" 
      color="secondary" 
      style={{marginLeft: "1rem", marginTop: "1rem"}}
      onClick={() => handleEdit(topic, newTitle)}>
        <EditIcon id="i" />
      </Button>

      <Button 
      type="submit" 
      variant="contained" 
      color="secondary" 
      style={{marginLeft: "1rem", marginTop: "1rem"}}
      onClick={() => handleDelete(topic.id)}>
        <DeleteIcon id="i" />
      </Button>

      <Button 
      type="submit" 
      variant="outlined" 
      style={{marginLeft: "1rem", marginTop: "1rem", height: "38px"}}
      color="secondary" >
        <Link to='/notes' 
        style={{textDecoration: "none", color: 'rgb(44, 43, 43)'}}
        state={{ subject_id: subject_id, topic_id: topic.id, currTopic: newTitle }}>
        <FileOpenIcon style={{color: "#883997", marginTop: "8px"}}/>
        </Link>
      </Button>
      </div>
    </div>
  );
}