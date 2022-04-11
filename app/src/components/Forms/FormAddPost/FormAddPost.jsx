// STYLES
import '../form.scss';
import classNames from 'classnames/bind';
import styles from './FormAddPost.module.scss';

// COMPONENTS
import Button from 'components/Button/Button';
import { Form, Field  } from 'react-final-form';
import FormControl from 'components/Forms/FormControl/FormControl';

// validators
import {
  composeValidators,
  required,
  maxLengthCreator
} from '../../../utils/validators/validators';

const FormAddPost = ( props ) => {
  const { addPost, } = props;

  const classes = classNames( [
    styles.FormAddPost,
    'form-add-message',
  ] );

  // HANDLERS
  const handleKeyPress = ( e ) => {
    if ( e.key === 'Enter' ){
      console.log( 'Enter' );
      // addPost( newPostText ) ;
    }
  };

  const handleOnSubmit = ( values ) => {
    const { newPostText, } = values;
    addPost( newPostText );
  };

  // const handleOnValidate = ( e ) => {};

  // validators
  const maxLength10 =  maxLengthCreator( 100 );

  return (
    <Form
      onSubmit={ handleOnSubmit }
      // validate={ handleOnValidate }
      render={ ( { handleSubmit, } ) => (
        <form onSubmit={ handleSubmit } className={ classes } noValidate>
          <Field validate={ composeValidators( required, maxLength10 ) } name="newPostText">
            { props => <FormControl { ...props }><textarea placeholder="Your post text..." cols="30" rows="10"/></FormControl> }
          </Field>
          <Button type="submit">Add Post</Button>
        </form>
      ) }
    />
  );
};

export default FormAddPost;

const oldTextarea = ( props ) => {
  const { input, meta, } = props;

  return (
    <div className="form-control">
      <textarea { ...input } placeholder="Your post text..." cols="30" rows="10"/>
      { meta.error && meta.touched && <span className="error">{ meta.error }</span> }
    </div>
  );
};