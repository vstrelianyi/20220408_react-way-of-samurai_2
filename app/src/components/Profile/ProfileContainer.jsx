import React from 'react';

// REDUX
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  getUserProfileThunkCreator,
  getUserStatusThunkCreator,
  setUserStatusThunkCreator,
  addPost,
  uploadPhotoThunkCreator,
  updateProfileThunkCreator
} from 'redux/profile-reducer.ts';

// COMPONENTS
import LoaderSpinner from 'components/Loaders/LoaderSpinner/LoaderSpinner';
import Profile from './Profile';

// HOC
import withAuthRedirect from '../../hoc/withAuthRedirect';

class ProfileClass extends React.Component {

  componentDidMount () {
    const userId = this.props.userId;
    if ( userId ){
      this.props.getUserProfile( userId );
      this.props.getUserStatus( userId );
    }
    else {
      console.log( 'no user' );
    }
    // console.log( 'ProfileClass -> componentDidMount:', userId );
  }

  // componentDidUpdate () {
  // }

  render () {
    if ( !this.props.profile ){
      return <LoaderSpinner isLoading={ true }/>;
    }

    return <Profile { ...this.props }/>;

  }
}

const mapStateToProps = ( state ) => {
  return {
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    status: state.profilePage.status,
    email: state.auth.email,
    userId: state.auth.userId,
  };
};

export default compose(
  connect( mapStateToProps, {
    getUserProfile: getUserProfileThunkCreator,
    setUserStatus: setUserStatusThunkCreator,
    getUserStatus: getUserStatusThunkCreator,
    addPost,
    uploadPhoto: uploadPhotoThunkCreator,
    updateProfile: updateProfileThunkCreator,
  } ),
  withAuthRedirect
)( ProfileClass );
