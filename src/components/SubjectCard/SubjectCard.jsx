import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from 'react-router-dom';

export default function SubjectCard({ subject, handleDelete, handleEdit }) {
  const [newTitle, setNewTitle] = useState(subject.subjectName);

  const handleChange = (e) => {
    e.preventDefault();
    setNewTitle(e.target.value);
    
  };
  return (
    <div className="todo">
      <input
        type="text"
        value={newTitle}
        onChange={handleChange}
      />
      <div>
        <button
          onClick={() => handleEdit(subject, newTitle)}
        >
          <EditIcon id="i" />
        </button>
        <button onClick={() => handleDelete(subject.id)}>
          <DeleteIcon id="i" />
        </button>
        <Link to='/topics' state={{ sub_id: subject.id, currSubject: newTitle }}>Open Notebook</Link>
      </div>
    </div>
  );
}