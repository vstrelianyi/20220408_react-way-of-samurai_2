// STYLES
import '../form.scss';
import classNames from 'classnames/bind';
import styles from './FormProfileData.module.scss';

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
const FormProfileData = ( props ) => {
  const { updateProfile, profile: { fullName, lookingForAJobDescription, contacts, aboutMe, }, userImage, } = props;

  const classes = classNames( [
    styles.FormProfileData,
    'form-profile-data',
  ] );

  // validators
  const maxLength =  maxLengthCreator( 10 );
  const minLength =  minLengthCreator( 4 );

  //HANDLERS
  const handleOnSubmit = async ( valuesObj ) => {
    updateProfile( valuesObj );
    await sleep( 500 );
  };
  const handleOnValidate = ( e ) => {
    // console.log( e );
  };

  return (
    <Form
      onSubmit={ handleOnSubmit }
      validate={ handleOnValidate }
      initialValues={ {
        fullName: fullName,
        lookingForAJobDescription: lookingForAJobDescription,
        aboutMe: aboutMe,
        contacts: {
          facebook: contacts.facebook,
          github: contacts.github,
          instagram: contacts.instagram,
          mainLink: contacts.mainLink,
          twitter: contacts.twitter,
          vk: contacts.vk,
          website: contacts.website,
          youtube: contacts.youtube,
        },
      } }
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
          <Field name="fullName" validate={ required }>
            { props => <FormControl label="Full name:" { ...props }><input placeholder="Full name"/></FormControl> }
          </Field>
          <Field name="lookingForAJob" type="checkbox">
            { props => <FormControl label="Looking for a job:" { ...props }><input type="checkbox"/></FormControl> }
          </Field>
          <Field name="lookingForAJobDescription" validate={ required }>
            { props => <FormControl label="Job description:" { ...props }><textarea placeholder="Job description..." rows="5"/></FormControl> }
          </Field>
          <Field name="aboutMe" validate={ required }>
            { props => <FormControl label="About me:" { ...props }><textarea placeholder="About me..." rows="5"/></FormControl> }
          </Field>

          { Object.keys( contacts ).map( key => {
            return (
              <Field name={ `contacts.${ key }` } key={ key }>
                { props => <FormControl label={ key } { ...props }><input placeholder={ `${ key }...` }/></FormControl> }
              </Field>
            );
          } )	}

          <Button type="submit" disabled={ submitting || pristine } >Update Profile</Button>
        </form>
      ) }
    />
  );
};

export default FormProfileData;