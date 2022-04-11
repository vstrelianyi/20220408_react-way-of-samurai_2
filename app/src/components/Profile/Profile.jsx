// STYLES
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

// COMPONENTS
import PostsList from 'components/Profile/PostsList/PostsList';
import ProfileInfo from 'components/Profile/ProfileInfo/ProfileInfo';
import ProfileStatusHooks from 'components/Profile/ProfileStatus/ProfileStatusHooks';
import FormAddPost from 'components/Forms/FormAddPost/FormAddPost';

// import { useParams } from 'react-router-dom';

const Profile = ( props ) => {
  const { profile, email, status, setUserStatus, posts, addPost, uploadPhoto, updateProfile, } = props;

  const classes = classNames( [
    styles.Profile,
    'profile',
  ] );

  return (
    <div className={ classes }>
      <ProfileStatusHooks status={ status } setUserStatus={ setUserStatus }/>
      <ProfileInfo profile={ profile } email={ email } uploadPhoto={ uploadPhoto } updateProfile={ updateProfile }/>
      <FormAddPost addPost={ addPost }/>
      <PostsList posts={ posts }/>
    </div>
  );
};

export default Profile;