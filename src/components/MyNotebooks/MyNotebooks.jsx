import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
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
    await deleteDoc(doc(db, "subjects", id));

    //delete the related topics
    const q1 = query(collection(db, "topics"));
    const delTopic = onSnapshot(q1, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().topicName);
        if(doc.data().subjectId === id) {
          console.log('topicsId', doc.id);
          deleteDoc(doc(db, "topics", doc.id));
        }
      });
    });
    return () => delTopic();
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
