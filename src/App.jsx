import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home'
import Topics from './components/Topics/Topics';

function App() {
  return (
    <div className="App">
      {/* <Header />
      <MyNotebooks /> */}
      {/* <Topics /> */}

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
          {/*<Route
            path="/notes/"
            element={
              <Notes />
            }
          /> */}
      </Routes>
    </div>
  );
}

export default App;
