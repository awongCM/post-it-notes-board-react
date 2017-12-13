import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './ButtonsContainer.scss';

class ButtonsContainer extends Component {
  constructor(props){
    super(props);
  }

  addNewNote(e) {
    const note_color = e.target.attributes.notetype.value;
    this.props.addNewNote(note_color);
  }

  render() {
    return(
      <div className="ButtonsContainer">
        <button className="nice-to-have-btn" onClick={this.addNewNote.bind(this)} notetype="yellow" >Add Nice-to-have Note</button>
        <button className="feature-btn" onClick={this.addNewNote.bind(this)} notetype="orange" >Add Feature Note</button>
        <button className="urgent-btn" onClick={this.addNewNote.bind(this)} notetype="red" >Add Urgent Notes</button>
      </div>
    )
  }
}

export default ButtonsContainer;


