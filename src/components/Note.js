import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './Note.scss';

class Note extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    this.props.onClick(this.props.note.id);
  }
  handleDelete() {
    this.props.onDelete(this.props.note.id);
  }
  render() {
    const {note} = this.props; 

    const styles = {
      backgroundColor: note.color
    };

    return(
      <div className="Note" style={styles} onClick={this.handleClick.bind(this)}>
        <div className="tile"><span className="deleteBtn" onClick={this.handleDelete.bind(this)}>X</span></div>
        <h4>{note.title}</h4>
        <p>{note.content}</p>
      </div>
    )
  }
}

export default Note;


