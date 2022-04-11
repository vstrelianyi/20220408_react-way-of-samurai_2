import React from 'react';

import classNames from 'classnames/bind';
import styles from './FormControl.module.scss';

const FormControl = ( props ) => {
  const { children, label, input, meta, } = props;

  const classes = classNames( [
    styles.FormControl,
    'form-control',
    meta.touched && meta.error ? styles.hasError : null,
  ] );

  return (
    <div className={ classes }>
      { label && <span>{ label }</span> }
      { React.cloneElement( children, { ...input, } ) }
      { meta.error && meta.touched && <span className="error">{ meta.error }</span> }
    </div>
  );
};

export default FormControl;