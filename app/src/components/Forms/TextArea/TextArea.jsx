import classNames from 'classnames/bind';
import styles from './TextArea.module.scss';

import React from 'react';

const TextArea = ( props ) => {
  const { className, input, meta, placeholder, } = props;

  const classes = classNames( [
    styles.TextArea,
    className,
    'form-control',
  ] );

  return (
    <div  className={ classes }>
      <textarea
        className="textarea"
        { ...input }
        placeholder={ placeholder ? placeholder : null }
        cols="30"
        rows="10"
      />
      { meta.error && meta.touched && <span className="error">{ meta.error }</span> }
    </div>
  );
};

export default TextArea;