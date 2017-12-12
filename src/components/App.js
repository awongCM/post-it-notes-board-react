import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';

import ButtonsContainer from "./ButtonsContainer";
import NotesContainer from "./NotesContainer";

const App = () => {
  return (
    <div className="App">
      <ButtonsContainer></ButtonsContainer>
      <NotesContainer></NotesContainer>
    </div>
  );
};


export default App;
