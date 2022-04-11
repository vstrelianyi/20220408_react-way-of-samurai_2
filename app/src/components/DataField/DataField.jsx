import classNames from 'classnames/bind';
import styles from './DataField.module.scss';

const DataField = ( props ) => {
  const { label, value, className, } = props;

  const classes = classNames( [
    styles.DataField,
    className,
    'data-field',
    'badge',
  ] );

  return (
    <div className={ classes }>
      <span className="label">{ label }</span>
      <span className="value">{ value }</span>
    </div>
  );
};

export default DataField;