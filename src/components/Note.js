import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './Note.scss';

const Note = ({note}) => {
  const styles = {
    backgroundColor: note.color
  };

  return (
    <div className="Note" style={styles}>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
    </div>
  )
}

export default Note;


