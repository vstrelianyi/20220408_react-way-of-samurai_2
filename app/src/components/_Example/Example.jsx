// STYLES
import classNames from 'classnames/bind';
import styles from './Example.module.scss';

// COMPONENTS

const Example = ( props ) => {
  const { children, } = props;

  const classes = classNames( [
    styles.Example,
    'example',
  ] );

  return (
    <div className={ classes }>Example</div>
  );
};

export default Example;