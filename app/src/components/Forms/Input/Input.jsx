import React from 'react';

// STYLES
import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const Input = ( props ) => {
  const { type = 'text', className, placeholder, input, meta, label, } = props;

  const classes = classNames( [
    styles.Input,
    className,
    'form-control',
    meta.touched && meta.error ? styles.hasError : null,
  ] );

  return (
    <label className={ classes } >
      { label && <span>{ label }</span> }
      <input
        { ...input }
        placeholder={ placeholder ? placeholder : null }
        className="input"
        type={ type }
      />
      { meta.error && meta.touched && <span className="error">{ meta.error }</span> }
    </label>
  );
};

export default Input;