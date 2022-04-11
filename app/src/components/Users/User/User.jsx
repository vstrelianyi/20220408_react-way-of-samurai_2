// STYLES
import classNames from 'classnames';
import styles from './User.module.scss';

// IMAGES
import image_default from 'images/users/default.png';

// COMPONENTS
import DataField from 'components/DataField/DataField';

const User = ( props ) => {
  const { profile, } = props;

  const classes = classNames( [
    styles.User,
    'single-user',
  ] );

  const userImage = profile?.photos?.small ? profile?.photos?.small : image_default;

  return (
    <div className={ classes }>
      <picture>
        <source srcSet={ userImage } type="image/webp" />
        <img src={ userImage } alt="" />
      </picture>
      <DataField className="mb-20" label="userId: " value={ profile?.userId }/>
      <DataField className="mb-20" label="name: " value={ profile?.fullName }/>
      <DataField className="mb-20" label="lookingForAJob: " value={ profile?.lookingForAJob ? 'true' : 'false' }/>
      { profile?.aboutMe  && <DataField className="mb-20" label="aboutMe: " value={ profile?.aboutMe }/> }
    </div>
  );
};

export default User;