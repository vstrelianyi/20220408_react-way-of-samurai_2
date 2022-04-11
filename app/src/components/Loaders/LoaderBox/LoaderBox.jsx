import classNames from 'classnames/bind';
import styles from './LoaderBox.module.scss';

const LoaderBox = ( props ) => {
  const classes = classNames( [
    styles.LoaderBox,
    'loader-box',
  ] );

  return (
    <div className={ classes }>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
    </div>
  );
};

export default LoaderBox;