// STYLES
import '../form.scss';
import classNames from 'classnames/bind';
import styles from './FormLogin.module.scss';

// COMPONENTS
import Button from 'components/Button/Button';
import { Field, Form } from 'react-final-form';
import FormControl from 'components/Forms/FormControl/FormControl';
// https://www.npmjs.com/package/react-google-recaptcha
// import ReCAPTCHA from 'react-google-recaptcha';

// utils
import sleep from 'utils/sleep';

// validators
import {
  composeValidators,
  required,
  maxLengthCreator,
  minLengthCreator
} from '../../../utils/validators/validators';

// https://social-network.samuraijs.com/docs?type=todolist#auth_login_post
const FormLogin = ( props ) => {
  const { loginUser, captchaURL, } = props;
  const classes = classNames( [
    styles.FormLogin,
    'form-login',
  ] );

  // validators
  const maxLength =  maxLengthCreator( 10 );
  // const minLength =  minLengthCreator( 4 );

  //HANDLERS
  const handleOnSubmit = async ( values ) => {
    console.log( values );
    await loginUser( values );
    await sleep( 500 );
  };

  const handleOnValidate = ( e ) => {
    // console.log( e );
  };

  // const onCaptchaPassed = async () => {
  //   console.log( 'onCaptchaPassed' );
  //   // setIsCaptchaPassed( true );
  // };

  return (
    <Form
      onSubmit={ handleOnSubmit }
      validate={ handleOnValidate }
      render={ ( { handleSubmit, form, submitting, pristine, } ) => (
        <form
          onSubmit={ event => {
            handleSubmit( event );
            // .then( form.reset );
          } }
          className={ classes }
          // autoComplete="off"
          noValidate
        >
          <Field name="email" validate={ required }>
            { props => <FormControl label="Email:" { ...props }><input placeholder="email"/></FormControl> }
          </Field>
          <Field name="password" validate={ required }>
            { props => <FormControl label="Password:" { ...props }><input placeholder="password" type="password"/></FormControl> }
          </Field>
          <Field name="rememberMe" type="checkbox">
            { props => <FormControl label="remember me:" { ...props }><input type="checkbox"/></FormControl> }
          </Field>

          { /* CAPTCHA FROM SERVEER */ }
          <div className="wrapper-captcha">
            { captchaURL ? <img className="img-captcha" src={ captchaURL } alt="" /> : <div className="img-captcha"><span>Loading image</span></div> }
            { captchaURL && (
              <Field
                name="captcha"
                // validate={ composeValidators( required, maxLength ) }
              >
                { props => <FormControl label="captcha: " { ...props }><input/></FormControl> }
              </Field>
            ) }
          </div>

          { /* <ReCAPTCHA
            sitekey="6Ld6OPAeAAAAAEHyoG4wzb63HV55s9hBaEwhbhwy"
            onChange={ onCaptchaPassed }
            theme="light"
            hl="uk"
            size="compact"
          /> */ }

          <Button type="submit" disabled={ submitting || pristine } >Login</Button>
        </form>
      ) }
    />
  );
};

export default FormLogin;