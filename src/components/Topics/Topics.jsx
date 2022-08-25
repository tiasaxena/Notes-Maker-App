import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, query, onSnapshot, doc, setDoc, deleteDoc, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase';
import TopicCard from '../TopicCard/TopicCard';
import Header from '../Header/Header';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

function Topics() {

  const location = useLocation();
  const sub_id = location.state.sub_id;
  const currSubject = location.state.currSubject;
  
  const [ topic, setTopic ] = useState("");
  const [ topicList, setTopicList ] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (topic !== "") {
      await addDoc(collection(db, "topics"), {
        topicName: topic,
        subjectId: sub_id,
      });
      setTopic("");
    }
  };

  useEffect(() => {
    const q = query(collection(db, "topics"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let topicArray = [];
      querySnapshot.forEach((doc) => {
        if(doc.data().subjectId === sub_id){
            topicArray.push({ ...doc.data(), id: doc.id });
        }
      });
      setTopicList(topicArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (topic, topicName) => {
    await setDoc(doc(db, "topics", topic.id), { topicName: topicName, subjectId: sub_id, });
  };

  const handleDelete = async (id) => {
    //delete the topic from database
    await deleteDoc(doc(db, "topics", id));

     //delete related notes from databse
     const collectionRefNote = collection(db, 'notes');
     const q_notes = query(collectionRefNote, where("topic_id", "==", id));
     const snapshot_notes = await getDocs(q_notes);
 
     const results_notes = snapshot_notes.docs.map((doc) => ({...doc.data(), id: doc.id}));
     results_notes.forEach(async (result) => {
       const docRef = doc(db, "notes", result.id);
       await deleteDoc(docRef);
     });
  };

  return (

    <>
      <Header 
      heading = {currSubject} />
      <div className="notebooks">
      <form onSubmit={handleSubmit}>

        <TextField
          id="outlined-password-input"
          label="Topic Name"
          value={topic}
          type="text" 
          placeholder='Topic Name' 
          required
          onChange={(event) => setTopic(event.target.value)}
        />
        <Button type="submit" variant="contained" color="secondary">
          <AddCircleOutlinedIcon/>
        </Button>
      </form>

      {topicList.map( (eachTopic) => ( 
        <TopicCard
            key={eachTopic.id}
            topic={eachTopic}
            subject_id = {sub_id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
      ))}
    </div>
    </>
  )
}

export default Topics;