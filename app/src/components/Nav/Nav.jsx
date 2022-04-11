import classNames from 'classnames/bind';
import styles from './Nav.module.scss';

// COMPONENTS
import { NavLink } from 'react-router-dom';

const Nav = () => {

  const classes = classNames( [
    styles.Nav,
    'nav',
  ] );

  const pages = [
    { id: 0, url: '/profile', title: 'profile', },
    { id: 1, url: '/chat', title: 'chat', },
    { id: 2, url: '/news', title: 'news', },
    { id: 3, url: '/music', title: 'music', },
    { id: 4, url: '/users', title: 'users', },
    { id: 5, url: '/settings', title: 'settings', },
    { id: 6, url: '/login', title: 'login', },
  ];

  return (
    <nav className={ classes }>
      <ul>
        { pages.map( page => <li key={ page.id }><NavLink  to={ page.url } className={ ( { isActive, } ) => ( isActive ? 'active' : null ) }>{ page.title }</NavLink ></li> ) }
      </ul>
    </nav>
  );
};

export default Nav;