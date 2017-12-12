import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import update from 'immutability-helper';

import ButtonsContainer from "./ButtonsContainer";
import Note from './Note';
import NoteForm from './NoteForm';
class NotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      editing_note_id:null
    };
  }
  componentDidMount(){
    axios.get('http://api.dev.local:5000/v1/notes')
      .then( res => {
        console.log(res);
        this.setState({notes: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  }
  addNewNote(note_color) {
    // console.log(note_color);

    axios.post('http://api.dev.local:5000/v1/notes',
      {
        note: {
          title: '',
          content: '',
          color: note_color
        }
      }  
    )
    .then(res => {
      console.log(res);
      const notes = update(this.state.notes, {
        $splice: [[0, 0, res.data ]]
      });
      this.setState({notes: notes, editing_note_id: res.data.id});
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
  render() {
    return (
      <div className="NotesContainer">
        <ButtonsContainer addNewNote={this.addNewNote.bind(this)}></ButtonsContainer>
        <h1>NotesContainer</h1>
          {
            this.state.notes.map( (note) => {
              if (this.state.editing_note_id === note.id) {
                return (<NoteForm key={note.id} note={note} updateNote={this.updateNote.bind(this)}/>)
              } else {
                return (<Note key={note.id} note={note} />)
              }
            })
          }
      </div>
    );
  }
}

export default NotesContainer;


