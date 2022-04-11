// STYLES
import classNames from 'classnames/bind';
import styles from './PostsList.module.scss';

// COMPONENTS
import PostItem from './PostItem/PostItem';
const PostsList = ( props ) => {
  const { posts, } = props;

  const classes = classNames( [
    styles.PostsList,
    'my-posts',
    'posts-list',
  ] );

  return (
    <div className={ classes }>
      { posts.map( post => <PostItem key={ post.id } message={ post.message } likesCount={ post.likesCount }/> ) }
    </div>
  );
};

export default PostsList;