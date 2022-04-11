import React from 'react';

// REDUX
import { connect } from 'react-redux';
import {
  setCurrentPage,
  getUsersThunkCreator,
  followUserThunkCreator,
  unFollowUserThunkCreator
} from 'redux/users-reducer.ts';

// COMPONENTS
import Users from 'components/Users/Users';
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsLoading,
  getIsButtonsDisabled
} from 'redux/users-selectors';

class UsersClass extends React.Component {
  componentDidMount () {
    this.props.getUsers( this.props.currentPage, this.props.pageSize );
  }

  onPageChanged ( page ) {
    this.props.getUsers( page, this.props.pageSize );
  }

  // onGetUsersButtonClick ( ) {
  // }

  toggleIsFollowed ( userId, followed ) {
    if ( followed ){
      this.props.unFollowUser( userId );
    }
    else {
      this.props.followUser( userId );
    }
  }

  render () {
    const pagesCount = Math.ceil( this.props.totalUsersCount / this.props.pageSize );

    return (
      <Users
        pagesCount={ pagesCount }
        currentPage={ this.props.currentPage }
        onPageChanged={ this.onPageChanged.bind( this ) }
        isLoading={ this.props.isLoading }
        users={ this.props.users }
        isButtonsDisabled={ this.props.isButtonsDisabled }
        toggleIsFollowed={ this.toggleIsFollowed.bind( this ) }
        getUsers={ this.onGetUsersButtonClick.bind( this ) }
      />
    );
  }
}

const mapStateToProps = ( state ) => {
  return {
    users: getUsers( state ),
    pageSize: getPageSize( state ),
    totalUsersCount: getTotalUsersCount( state ),
    currentPage: getCurrentPage( state ),
    isLoading: getIsLoading( state ),
    isButtonsDisabled: getIsButtonsDisabled( state ),
  };
};

const UsersContainer = connect( mapStateToProps, {
  setCurrentPage,
  getUsers: getUsersThunkCreator,
  followUser: followUserThunkCreator,
  unFollowUser: unFollowUserThunkCreator,
} )( UsersClass );

export default UsersContainer;
