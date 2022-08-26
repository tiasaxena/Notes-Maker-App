import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FileOpenIcon from '@mui/icons-material/FileOpen';

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
    <div
    style={{
      width:"100%",
      margin:"0 35%",
    }}>
      <CardContent
        style={{ 
        display: "flex", 
        backgroundColor:"rgb(214, 180, 214)", 
        width:"30%", 
        borderRadius:"2rem", 
        marginBottom: "2rem",
        padding:"3rem"
        }}>
        <div>
        <Typography>
          <TextField
          type="text"
          color="secondary"
          value={newTitle}
          onChange={handleChangeTitle}
          style={{marginBottom:'1rem'}}
          />
        {/* </Typography>
        <Typography> */}
          <TextField
          type="text"
          color="secondary"
          value={newContent}
          onChange={handleChangeContent}/>
        </Typography>
        </div>

        <div
        style={{display: "flex", flexDirection: "column"}}>
          <Button 
        type="submit"
        variant="outlined"
        color="secondary"
        style={{height: "38px", marginBottom:'0.5rem'}}
        onClick={() => handleEdit(note, newTitle, newContent)}>
          <EditIcon id="i" />
          </Button>

          <Button 
        type="submit"
        variant="contained"
        color="secondary"
        style={{height: "38px", marginBottom:'0.5rem'}}
        onClick={() => handleDelete(note.id)}>
          <DeleteIcon id="i" />
          </Button>

          <Button
        type="submit"
        variant="outlined"
        color="secondary"
        style={{height: "38px"}}>
          <Link 
          to='/notesdetail' 
          style={{textDecoration: "none", color: 'rgb(44, 43, 43)'}}
          state={{ title: newTitle, content: newContent}}>
          <FileOpenIcon style={{color: "#883997", marginTop: "8px"}}/>
          </Link>
          </Button>
        </div>
      </CardContent>
    </div>
  );
}