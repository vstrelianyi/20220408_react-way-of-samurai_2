import React from 'react';

// STYLES
import classNames from 'classnames/bind';
import styles from './Chat.module.scss';

// COMPONENTS
import MessageList from './MessageList/MessageList';
import DialogsContainer from './Dialogs/DialogsContainer';
import MessageInput from './MessageInput/MessageInput';

const Chat = ( props ) => {
  const { dialogs, messages, addMessage, } = props;

  const classes = classNames( [
    styles.Chat,
    'chat',
  ] );

  return (
    <div className={ classes }>
      <DialogsContainer dialogs={ dialogs }/>
      <MessageList messages={ messages }/>
      <MessageInput addMessage={ addMessage }/>
    </div>
  );
};

export default Chat;