import React from 'react';
import { ButtonLayout } from './styles';

function LayoutButton(props) {
  const handleClickFilm = () => {
    props.handleWatching();
  };

  return <ButtonLayout onClick={handleClickFilm}>{props.text}</ButtonLayout>;
}

export default LayoutButton;
