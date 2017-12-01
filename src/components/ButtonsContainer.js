import React from 'react';
import ReactDOM from 'react-dom';

import './ButtonsContainer.scss';

const ButtonsContainer = (props) => {
  return (
    <div className="ButtonsContainer">
      <button onClick={addNewNote}>Add New Notes1</button>
      <button onClick={addNewNote}>Add New Notes2</button>
      <button onClick={addNewNote}>Add New Notes3</button>
    </div>
  );
};

const addNewNote = e => (
  console.log("Add new Note", e.target)
)

export default ButtonsContainer;


