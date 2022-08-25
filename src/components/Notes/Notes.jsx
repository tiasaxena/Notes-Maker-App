import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, query, onSnapshot, doc, setDoc, deleteDoc, where, getDocs,  } from "firebase/firestore";
import { db } from '../../firebase';
import NoteCard from '../NoteCard/NoteCard';

function Notes() {

  const location = useLocation();
  const subject_id  = location.state.subject_id;
  const topic_id = location.state.topic_id;

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
    await setDoc(doc(db, "notes", note.id), { title: title, content: content });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    // <div className="notebooks">
    //     {/* form to create new notebooks */}

    //     {/* display old notebooks -> link to different notebooks */}
    // </div>

    <div className="notebooks">
      <form onSubmit={handleSubmit}>
        <input
        value={title}
        type="text" 
        placeholder='Title' 
        required
        onChange={(event) => setTitle(event.target.value)}
        />
        <input
        value={content}
        type="text" 
        placeholder='content' 
        required
        onChange={(event) => setContent(event.target.value)}
        />
        <button type='submit'>Add</button>
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
  )
}

export default Notes;
