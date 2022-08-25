import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SubjectCard({ subject, handleDelete, handleEdit }) {
  const [newTitle, setNewTitle] = useState(subject.subjectName);

  const handleChange = (e) => {
    e.preventDefault();
    setNewTitle(e.target.value);
    
  };
  return (
    <div className="todo">
      <TextField
          id="outlined-password-input"
          type="text"
          value={newTitle}
          onChange={handleChange}
          placeholder='subject name' 
          required
        />
        
      <Button 
      type="submit" 
      variant="outlined" 
      color="secondary" 
      onClick={() => handleEdit(subject, newTitle)}>
        <EditIcon id="i" />
      </Button>

      <Button 
      type="submit" 
      variant="contained" 
      color="secondary" 
      onClick={() => handleDelete(subject.id)}>
        <DeleteIcon id="i" />
      </Button>

      <Button 
      type="submit" 
      variant="outlined" 
      color="secondary" >
        <Link to='/topics' state={{ sub_id: subject.id, currSubject: newTitle }}>Open Notebook</Link>
      </Button>

      {/* <Link to='/topics' state={{ sub_id: subject.id, currSubject: newTitle }}>Open Notebook</Link> */}
    </div>
  );
}