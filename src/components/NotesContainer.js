import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import update from 'immutability-helper';

import ButtonsContainer from "./ButtonsContainer";
import Note from './Note';
class NotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
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
      this.setState({notes: notes});
    })
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div className="NotesContainer">
        <ButtonsContainer addNewNote={this.addNewNote.bind(this)}></ButtonsContainer>
        <h1>NotesContainer</h1>
          {
            this.state.notes.map( (note) => {
              return(
                <Note key={note.id} note={note}></Note>
              )
            })
          }
      </div>
    );
  }
}

export default NotesContainer;


