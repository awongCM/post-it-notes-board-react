import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import update from 'immutability-helper';
import Draggable from 'react-draggable';

import NotesBoardAPI from '../service/api';
import ButtonsContainer from "./ButtonsContainer";
import Note from './Note';
import NoteForm from './NoteForm';
import './NotesContainer.scss';

class NotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      editing_note_id: null
    };
  }
  componentDidMount() {

    NotesBoardAPI.getRequest()
    .then( res => {
      console.log(res);
      this.setState({notes: res.data});
    })
    .catch(err => {
      console.log(err);
    });
  }
  addNewNote(note_color) {
    const data = {
        note: {
          title: '',
          content: '',
          color: note_color
        }
    };
    
    NotesBoardAPI.postRequest(data)
    .then(res => {
      console.log(res);
      const notes = update(this.state.notes, {
        $splice: [[0, 0, res.data ]]
      });
      this.setState({notes: notes, editing_note_id: res.data.id});
    })
    .catch(err => console.log(err));

  }
  deleteNote(id) {
    NotesBoardAPI.deleteRequest(id)
    .then(res => {
      const note_index = this.state.notes.findIndex( current_note => current_note.id === id);
      const notes = update(this.state.notes, {$splice: [[note_index, 1]]});
      this.setState({notes: notes});
    })
    .catch(err => console.log(err));
  }
  updateNote(note) {
    const note_index = this.state.notes.findIndex( current_note => current_note.id === note.id);
    const notes = update(this.state.notes, {
      [note_index]: {$set: note}
    });
    this.setState({notes: notes}, () => console.log("All changes saved"));
  }
  enableEditing(id) {
    this.setState({editing_note_id: id}, () => this.title.focus());
  }
  resetEditing(e) {
    //prevent from re-rendering multiple times if editing id is already reset
    if (e.target.className === "NotesContainer" && this.state.editing_note_id !== null) {
      this.setState({editing_note_id: null});
    }
  }
  randomPosition() {
    // we want our post-it notes to be visble within the desktop viewing browser window
    // hence we need to give some amount of displacement of their respective positions
    // depending on their respective dimension sizes
    let rand_x = Math.ceil(Math.random() * (window.innerWidth - 300)),
        rand_y = Math.ceil(Math.random() * (window.innerHeight - 300));

    return {
      x: rand_x, 
      y: rand_y
    };
  }
  renderNoteForm(note) {
    return(
      <NoteForm key={note.id} 
          note={note} 
          titleRef= {input => this.title = input}
          updateNote={this.updateNote.bind(this)}/>);
  }
  renderNote(note) {
    return(
      <Note key={note.id} 
          note={note} 
          onClick={this.enableEditing.bind(this)} 
          onDelete={this.deleteNote.bind(this)}/>);
  }
  eachItemOf(note) {
    const newPosition = this.randomPosition();

    return( 
    <Draggable key={note.id} enableUserSelectHack={false}  defaultPosition={newPosition}>
     {/* Create an actual DOM wrapper for draggable components  */}
      <div>
        {(this.state.editing_note_id === note.id) ? this.renderNoteForm(note) : this.renderNote(note)}
      </div>
    </Draggable>);
  }
  render() {
    return (
      <div className="NotesContainer" onClick={this.resetEditing.bind(this)}>
        <ButtonsContainer addNewNote={this.addNewNote.bind(this)}></ButtonsContainer>
        <h1 className="heading">Post-it-notes Board</h1>
        {this.state.notes.map(this.eachItemOf.bind(this))}
      </div>
    );
  }
}

export default NotesContainer;


