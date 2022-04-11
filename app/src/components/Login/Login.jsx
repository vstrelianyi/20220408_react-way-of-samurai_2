// STYLES
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

// COMPONENTS
import FormLogin from 'components/Forms/FormLogin/FormLogin';
import Button from 'components/Button/Button';

const Login = ( props ) => {
  const { isAuth, loginUser, logoutUser, captchaURL, } = props;

  const classes = classNames( [
    styles.Login,
    'login',
  ] );

  return (
    <div className={ classes }>
      { !isAuth ? <FormLogin loginUser={ loginUser } captchaURL={ captchaURL }/> : <Button onClick={ logoutUser }>Logout</Button> }
    </div>
  );
};

export default Login;