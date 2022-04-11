import classNames from 'classnames/bind';
import styles from './MessageInput.module.scss';

import FormAddChatMessage from 'components/Forms/FormAddChatMessage/FormAddChatMessage';

const MessageInput = ( props ) => {
  const { addMessage,  } = props;

  const classes = classNames( [
    styles.MessageInput,
    'message-input',
  ] );

  return (
    <div className={ classes }>
      <FormAddChatMessage addMessage={ addMessage }/>
    </div>
  );
};

export default MessageInput;
