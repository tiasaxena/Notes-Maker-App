import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Link} from 'react-router-dom';

export default function TopicCard({ topic, handleDelete, handleEdit }) {
  const [newTitle, setNewTitle] = useState(topic.topicName);

  const handleChange = (e) => {
    e.preventDefault();
    setNewTitle(e.target.value);
    
  };
  return (
    <>
      <input
        type="text"
        value={newTitle}
        onChange={handleChange}
      />
      <div>
        <button
          onClick={() => handleEdit(topic, newTitle)}
        >
          <EditIcon id="i" />
        </button>
        <button onClick={() => handleDelete(topic.id)}>
          <DeleteIcon id="i" />
        </button>
        <Link to='/notes' state={{ topic_id: topic.id }}>Study Topic</Link>
      </div>
    </>
  );
}