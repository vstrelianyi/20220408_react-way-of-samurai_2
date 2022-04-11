import classNames from 'classnames/bind';
import styles from './NoMatch.module.scss';

const NoMatch = ( props ) => {
  const { children, } = props;

  const classes = classNames( [
    styles.NoMatch,
    'no-match',
  ] );

  return (
    <div className={ classes }>
      <h1>the page does not exist</h1>
    </div>
  );
};

export default NoMatch;