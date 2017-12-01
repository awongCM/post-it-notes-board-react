import React from 'react';
import ReactDOM from 'react-dom';

import './ButtonsContainer.scss';

const ButtonsContainer = (props) => {
  return (
    <div className="ButtonsContainer">
      <button onClick={handleClick}>Add New Notes1</button>
      <button onClick={handleClick}>Add New Notes2</button>
      <button onClick={handleClick}>Add New Notes3</button>
    </div>
  );
};

const handleClick = e => (
  console.log("Button clicked", e.target)
)

export default ButtonsContainer;


