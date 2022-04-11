import classNames from 'classnames';
import styles from './LoaderDots.module.scss';

const LoaderDots = ( props ) => {
  const { isLoading, className, } = props;

  const classes = classNames( [
    styles.LoaderDots,
    className?.includes( 'small' ) ? styles.SpinnerLoadingSmall : null,
  ] );

  return (
    isLoading ? (
      <div className={ classes }>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    ) : null
  );
};

export default LoaderDots;