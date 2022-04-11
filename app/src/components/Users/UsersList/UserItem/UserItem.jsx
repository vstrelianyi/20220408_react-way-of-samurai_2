// STYLES
import classNames from 'classnames/bind';
import styles from './UserItem.module.scss';

// COMPONENTS
import Button from '../../../Button/Button';
import DataField from '../../../DataField/DataField';
import { Link } from 'react-router-dom';

// IMAGES
import image_default from '../../../../images/users/default.png';

const UserItem = ( props ) => {
  const { user, toggleIsFollowed, isButtonsDisabled, } = props;
  const classes = classNames( [
    styles.UserItem,
    'user-item',
    'bordered',
  ] );

  const handleFollowClick = () => {
    toggleIsFollowed( user.id, user?.followed );
  };
  // console.log( user );
  const userImage = user?.image ? user?.image : image_default;

  return (
    <div className={ classes }>

      <div className="col">
        <Link to={ `/users/${ user?.id }` }>
          <picture>
            <source srcSet={ userImage } type="image/webp" />
            <img src={ userImage } alt="" />
          </picture>
        </Link>
        <Button onClick={ handleFollowClick } disabled={ isButtonsDisabled.some( id => id === user?.id ) }>{ user?.followed ? 'Unfollow' : 'Follow' }</Button>
      </div>

      <div className="col">
        <div className="left">
          <DataField label="name:" value={ user?.name }/>
          <DataField label="description:" value={ user?.description }/>
          <DataField label="status:" value={ user?.status }/>
        </div>
        <div className="right">
          <DataField label="id:" value={ user?.id }/>
          <DataField label="country:" value={ user?.location?.country }/>
          <DataField label="city:" value={ user?.location?.city }/>
        </div>
      </div>

    </div>
  );
};

export default UserItem;