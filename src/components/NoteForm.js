import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './Note.scss';

class NoteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.note.title,
      content: this.props.note.content
    };
  }
  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleBlur() {
    const note = {
      title: this.state.title,
      content: this.state.content
    };

    axios.put(`http://api.dev.local:5000/v1/notes/${this.props.note.id}`,
      {
        note: note
      }
    )
    .then(res => {
      console.log(res);
      this.props.updateNote(res.data);
    })
    .catch(err => console.log(err));
  }

  render() {
    const styles = {
      backgroundColor: this.props.note.color
    };
    return(
      <div className="Note" style={styles}>
        <form onBlur={this.handleBlur.bind(this)}>
          <input className="input" 
                type="text" 
                name="title" 
                placeholder="Enter your title"
                value={this.state.title} onChange={this.handleInput.bind(this)} 
                ref={this.props.titleRef} />
          <textarea className="textarea" 
                    name="content" 
                    placeholder="Enter your content"
                    value={this.state.content} onChange={this.handleInput.bind(this)}>
          </textarea>
        </form>
      </div>
    );
  }

}

export default NoteForm;


