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
        <button onClick={this.addNewNote.bind(this)} notetype="yellow" >Add Yellow Note</button>
        <button onClick={this.addNewNote.bind(this)} notetype="blue">Add Blue Note</button>
        <button onClick={this.addNewNote.bind(this)} notetype="red">Add Red Note</button>
      </div>
    )
  }
}

export default ButtonsContainer;


