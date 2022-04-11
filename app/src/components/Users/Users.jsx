// STYLES
import classNames from 'classnames/bind';
import styles from './Users.module.scss';
// import { Outlet } from 'react-router-dom';

// COMPONENTS
import Pagination from 'components/Pagination/Pagination';
import LoaderSpinner from 'components/Loaders/LoaderSpinner/LoaderSpinner';
// import Button from 'components/Button/Button';
import UsersList from 'components/Users/UsersList/UsersList';

const Users = ( props ) => {
  const {
    pagesCount,
    currentPage,
    onPageChanged,
    isLoading,
    users,
    isButtonsDisabled,
    toggleIsFollowed,
    // getUsers,
  } = props;

  const classes = classNames( [
    styles.Users,
    'users',
  ] );

  return (
    <div className={ classes }>
      <Pagination itemsCount={ pagesCount } currentPage={ currentPage } onPageChanged={ onPageChanged }/>
      { isLoading ?
        <LoaderSpinner isLoading={ isLoading }/> :
        <UsersList users={ users } isButtonsDisabled={ isButtonsDisabled } toggleIsFollowed={ toggleIsFollowed }/>
      }
      { /* <Button onClick={ getUsers }>Get Users</Button> */ }
    </div>
  );
};

export default Users;