import classNames from 'classnames/bind';
import styles from './Header.module.scss';

// COMPONENTS
import { Link, NavLink } from 'react-router-dom';
import Button from 'components/Button/Button';

// IMAGES
import logo from 'images/logo.png';

const Header = ( props ) => {
  const { email, isAuth, logoutUser, } = props;
  const classes = classNames( [
    styles.Header,
    'header',
  ] );

  return (
    <header className={ classes }>
      <Link to="/" className="brand"><img src={ logo } alt="" />Samurai Chat</Link>

      <div className="login-block">
        { !isAuth ? <Link className="button" to={ '/login' }>Login</Link> : <><span>{ email }</span><Button onClick={ logoutUser }>Logout</Button></> }
      </div>
    </header>
  );
};

export default Header;