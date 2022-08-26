import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, query, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase';
import NoteCard from '../NoteCard/NoteCard';
import Header from '../Header/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

function Notes() {

  const location = useLocation();
  const subject_id  = location.state.subject_id;
  const topic_id = location.state.topic_id;
  const currTopic = location.state.currTopic;

  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ noteList, setNoteList ] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (title !== "" && content !== "") {
      await addDoc(collection(db, "notes"), {
        title: title,
        content: content,
        subject_id: subject_id,
        topic_id: topic_id,
      });
      setTitle("");
      setContent("");
    }
  };

  useEffect(() => {
    const q = query(collection(db, "notes"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let noteArray = [];
      querySnapshot.forEach((doc) => {
        if(doc.data().subject_id === subject_id && doc.data().topic_id === topic_id) {
            noteArray.push({ ...doc.data(), id: doc.id });
        }
      });
      setNoteList(noteArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (note, title, content) => {
    await setDoc(doc(db, "notes", note.id), { title: title, content: content, subject_id: note.subject_id, topic_id: note.topic_id });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <>
      <Header
        heading = {currTopic}
      />
      <div className="notebooks">
      <form onSubmit={handleSubmit}
      style={{textAlign: "center", 
      marginTop: "5rem"}} >
        <TextField
          id="outlined-password-input"
          label="Title"
          value={title}
          type="text" 
          placeholder='Title'
          color='secondary'
          required
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          id="outlined-password-input"
          label="Content"
          value={content}
          type="text" 
          color='secondary'
          placeholder='content' 
          required
          style={{marginLeft: "1rem"}}
          onChange={(event) => setContent(event.target.value)}
        />
        <Button 
        style={{marginLeft: "1rem", marginTop: "1rem"}}
        type="submit" 
        variant="contained" 
        color="secondary">
          <AddCircleOutlinedIcon />
        </Button>
      </form>

      {noteList.map( (eachNote) => (
        <NoteCard
            key={eachNote.id}
            note={eachNote}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
      ))}
      
    </div>
    </>
  )
}

export default Notes;
