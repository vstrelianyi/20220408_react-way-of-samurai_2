import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';

const PostItem = ( props ) => {

  const { likesCount, message, } = props;
  const classes = classNames( [
    styles.PostItem,
    'post-item',
    'badge',
  ] );

  return (
    <div className={ classes }>{ message }</div>
  );
};

export default PostItem;