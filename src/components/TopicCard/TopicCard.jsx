import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function TopicCard({ topic, subject_id, handleDelete, handleEdit }) {
  const [newTitle, setNewTitle] = useState(topic.topicName);

  const handleChange = (e) => {
    e.preventDefault();
    setNewTitle(e.target.value);
    
  };
  return (
    <>
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
      onClick={() => handleEdit(topic, newTitle)}>
        <EditIcon id="i" />
      </Button>

      <Button 
      type="submit" 
      variant="contained" 
      color="secondary" 
      onClick={() => handleDelete(topic.id)}>
        <DeleteIcon id="i" />
      </Button>

      <Button 
      type="submit" 
      variant="outlined" 
      color="secondary" >
        <Link to='/notes' state={{ subject_id: subject_id, topic_id: topic.id, currTopic: newTitle }}>Study Topic</Link>
      </Button>
      
      
      
    </>
  );
}