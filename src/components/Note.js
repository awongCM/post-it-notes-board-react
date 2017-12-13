import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

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
      <div className="Note" style={styles}>
        <div className="tile"><span className="deleteBtn" onClick={this.handleDelete.bind(this)}>X</span></div>
        <h4 onClick={this.handleClick.bind(this)}>{note.title}</h4>
        <p onClick={this.handleClick.bind(this)}>{note.content}</p>
      </div>
    )
  }
}

Note.propTypes = {
  note: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Note;


