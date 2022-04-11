// REACT
import React from 'react';
import { useParams } from 'react-router-dom';

// REDUX
import { connect } from 'react-redux';
import {
  getUserThunkCreator
} from 'redux/users-reducer.ts';

// COMPONENTS
import LoaderSpinner from '../../Loaders/LoaderSpinner/LoaderSpinner';
import User from './User';

class UserClass extends React.Component {
  constructor ( props ) {
    super( props );
    this.state = {
    };
  }

  componentDidMount () {
    this.props.getUser( this.props.userId );
  }

  render () {
    if ( this.props.profile === null ){
      return <LoaderSpinner isLoading={ true }/>;
    }
    if ( this.props.profile === undefined ){
      return <p>No user found</p>;
    }

    return <User profile={ this.props.profile }/>;
  }
}

const UserContainer = ( props ) => {
  const { userId, } = useParams();

  return (
    <UserClass { ...props } userId={ userId }/>
  );
};

const mapStateToProps = ( state ) => {
  return {
    profile: state.usersPage.userProfile,
  };
};

export default connect( mapStateToProps, { getUser: getUserThunkCreator, } )( UserContainer );
