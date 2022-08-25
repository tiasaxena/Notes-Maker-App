import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function NoteCard({ note, handleDelete, handleEdit }) {
  const [newTitle, setNewTitle] = useState(note.title);
  const [newContent, setNewContent] = useState(note.content);

  const handleChangeTitle = (e) => {
    e.preventDefault();
    setNewTitle(e.target.value);
  };
  const handleChangeContent = (e) => {
    e.preventDefault();
    setNewContent(e.target.value);
  };

  return (
    <div>
      <TextField
        type="text"
        value={newTitle}
        onChange={handleChangeTitle}
      />
      <TextField
        type="text"
        value={newContent}
        onChange={handleChangeContent}
      />
        
      <Button 
      type="submit"
      variant="outlined"
      color="secondary"
      onClick={() => handleEdit(note, newTitle, newContent)}>
        <EditIcon id="i" />
      </Button>

      <Button 
      type="submit"
      variant="contained"
      color="secondary"
      onClick={() => handleDelete(note.id)}>
        <DeleteIcon id="i" />
      </Button>

      <Button 
      type="submit"
      variant="outlined"
      color="secondary"
      onClick={() => handleDelete(note.id)}>
        <Link to='/notesdetail' state={{ title: newTitle, content: newContent}}>Open Notes</Link>
      </Button>
    
      
    </div>
  );
}