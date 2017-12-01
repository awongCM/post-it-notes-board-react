import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.scss';

const App = ({name}) => {
  return (
    <div className="App">
      <h1>Hello World, {name}</h1>
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string
}

export default App;
