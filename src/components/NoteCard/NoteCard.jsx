import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from 'react-router-dom';

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
      <input
        type="text"
        value={newTitle}
        onChange={handleChangeTitle}
      />
      <input
        type="text"
        value={newContent}
        onChange={handleChangeContent}
      />
        <button
          onClick={() => handleEdit(note, newTitle, newContent)}
        >
          <EditIcon id="i" />
        </button>
        <button onClick={() => handleDelete(note.id)}>
          <DeleteIcon id="i" />
        </button>
    
      <div>
        <Link to='/notesdetail' state={{ title: newTitle, content: newContent}}>Open Notes</Link>
        {/* Open notebook's topic's note fully */}
      </div>
    </div>
  );
}