import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class NotesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    };
  }
  componentDidMount(){
    axios.get('http://api.dev.local:3001/v1/notes.json')
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
        <ul>
          {
            this.state.notes.map( (note) => {
              return(
                <li>
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                  <p>{note.color}</p>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

export default NotesContainer;


