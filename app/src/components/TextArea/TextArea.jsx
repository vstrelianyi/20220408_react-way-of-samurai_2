import classNames from 'classnames/bind';
import styles from './TextArea.module.scss';

import React from 'react';

const TextArea = ( props ) => {
  const { className, id, onChange, value, onKeyUp, } = props;

  const classes = classNames( [
    styles.TextArea,
    className,
    'textarea',
  ] );

  // HANDLERS
  const handleOnChange = ( e ) => {
    const value = e.target.value;
    onChange( value );
  };
  const handleKeyPress = ( e ) => {
    onKeyUp( e );
  };

  return (
    <textarea
      className={ classes }
      id={ id ? id : null }
      cols="30"
      rows="10"
      value={ value }
      onChange={ handleOnChange }
      onKeyUp={ handleKeyPress }
    ></textarea>
  );
};

export default TextArea;