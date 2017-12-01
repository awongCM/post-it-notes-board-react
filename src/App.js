import React, { Component } from 'react';
import PropTypes from 'prop-types';

const App = ({name}) => {
  return (
    <h1>Hello World, {name}</h1>
  );
};

App.propTypes = {
  name: PropTypes.string
}

export default App;
