// STYLES
import classNames from 'classnames/bind';
import styles from './ProfileData.module.scss';

// COMPONENTS
import DataField from 'components/DataField/DataField';

const ProfileData = ( props ) => {
  const { profile, userImage, email, } = props;

  const classes = classNames( [
    styles.ProfileData,
    'profile-data',
  ] );
  const { userId, fullName, lookingForAJobDescription, aboutMe, contacts, } = profile;

  // console.log( contacts );

  return (
    <div className={ classes }>

      <picture className="profile-image">
        <source srcSet={ userImage } type="image/webp" />
        <img src={ userImage } alt="" />
      </picture>

      <DataField label="id: " value={ userId }/>
      <DataField label="Full Name: " value={ fullName }/>
      <DataField label="email: " value={ email }/>
      <DataField label="Job Description: " value={ lookingForAJobDescription }/>
      <DataField label="About Me: " value={ aboutMe }/>

      { Object.keys( contacts ).map( key => <DataField key={ key } label={ `${ key } :` } value={ contacts[key] }/> ) }
    </div>
  );
};

export default ProfileData;