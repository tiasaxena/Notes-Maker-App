import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home'
import Topics from './components/Topics/Topics';
import Notes from './components/Notes/Notes';
import NotesDetail from './components/NotesDetail/NotesDetail'

function App() {
  return (
    <div className="App">

      <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />
           <Route
            path="/topics/"
            element={
              <Topics />
            }
          />
          <Route
            path="/notes/"
            element={
              <Notes />
            }
          />
          <Route
            path="/notesdetail/"
            element={
              <NotesDetail />
            }
          />
      </Routes>
    </div>
  );
}

export default App;
