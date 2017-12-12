import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Note from './Note';
class NotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }
  componentDidMount(){
    axios.get('http://api.dev.local:5000/v1/notes.json')
      .then( res => {
        console.log(res);
        this.setState({notes: res.data});
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="NotesContainer">
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


