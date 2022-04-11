// STYLES
import '../form.scss';
import classNames from 'classnames/bind';
import styles from './FormAddChatMessage.module.scss';

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

const FormAddChatMessage = ( props ) => {
  const { addMessage, } = props;

  const classes = classNames( [
    styles.FormAddChatMessage,
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
    const { newMessageText, } = values;
    addMessage( newMessageText );
  };

  // const handleOnValidate = ( e ) => {};

  return (
    <Form
      onSubmit={ handleOnSubmit }
      // validate={ handleOnValidate }
      render={ ( { handleSubmit, } ) => (
        <form onSubmit={ handleSubmit } className={ classes } noValidate>
          <Field validate={ required } name="newMessageText">
            { props => <FormControl label="Email:" { ...props }><input placeholder="message text..."/></FormControl> }
          </Field>
          <Button type="submit">Send Message</Button>
        </form>
      ) }
    />
  );
};

export default FormAddChatMessage;

const oldInput = ( props ) => {
  const { input, meta, } = props;

  return (
    <div className="form-control">
      <input { ...input } placeholder="message text..."/>
      { meta.error && meta.touched && <span className="error">{ meta.error }</span> }
    </div>
  );
};
