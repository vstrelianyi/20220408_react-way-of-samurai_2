import classNames from 'classnames/bind';
import styles from './MessageList.module.scss';

const MessageList = ( props ) => {

  const { messages, } = props;

  const classes = classNames( [
    styles.MessageList,
    'message-list',
  ] );

  return (
    <div className={ classes }>
      { messages?.length && messages.map( message => <MessageItem key={ message.id } message={ message }/> )  }
    </div>
  );
};

const MessageItem = ( props ) => {
  const { message, } = props;

  return (
    <div className="message-item">{ message.text }</div>
  );
};

export default MessageList;