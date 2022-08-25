import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, doc, setDoc, deleteDoc, where, getDocs,  } from "firebase/firestore";
import { db } from '../../firebase';
import SubjectCard from '../SubjectCard/SubjectCard';

function MyNotebooks() {

  const [ subject, setSubject ] = useState("");
  const [ subjectList, setSubjectList ] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (subject !== "") {
      await addDoc(collection(db, "subjects"), {
        subjectName: subject
      });
      setSubject("");
    }
  };

  useEffect(() => {
    const q = query(collection(db, "subjects"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let subjectArray = [];
      querySnapshot.forEach((doc) => {
        subjectArray.push({ ...doc.data(), id: doc.id });
      });
      setSubjectList(subjectArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (subject, subjectName) => {
    await setDoc(doc(db, "subjects", subject.id), { subjectName: subjectName });
  };

  const handleDelete = async (id) => {
    //delete subject name for databse
    await deleteDoc(doc(db, "subjects", id));

    //delete related topics from databse
    const collectionRefTopic = collection(db, 'topics');
    const q_topic = query(collectionRefTopic, where("subjectId", "==", id));
    const snapshot_topic = await getDocs(q_topic);

    const results_topic = snapshot_topic.docs.map((doc) => ({...doc.data(), id: doc.id}));
    console.log(results_topic);
    results_topic.forEach(async (result) => {
      const docRef = doc(db, "topics", result.id);
      await deleteDoc(docRef);
    });

    //delete related notes from databse
    const collectionRefNote = collection(db, 'notes');
    const q_notes = query(collectionRefNote, where("subject_id", "==", id));
    const snapshot_notes = await getDocs(q_notes);

    const results_notes = snapshot_notes.docs.map((doc) => ({...doc.data(), id: doc.id}));
    results_notes.forEach(async (result) => {
      const docRef = doc(db, "notes", result.id);
      await deleteDoc(docRef);
    });
  };

  return (
    // <div className="notebooks">
    //     {/* form to create new notebooks */}

    //     {/* display old notebooks -> link to different notebooks */}
    // </div>

    <div className="notebooks">
      <form onSubmit={handleSubmit}>
        <input
        value={subject}
        type="text" 
        placeholder='subject name' 
        required
        onChange={(event) => setSubject(event.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>

      {subjectList.map( (eachSubject) => (
        <SubjectCard
            key={eachSubject.id}
            subject={eachSubject}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
      ))}
    </div>
  )
}

export default MyNotebooks;