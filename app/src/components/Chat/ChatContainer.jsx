import Chat from './Chat';

// REDUX
import { connect } from 'react-redux';

import {
  addMessage
} from 'redux/chat-reducer.ts';

const mapStateToProps = ( state ) => {
  return {
    dialogs: state.chatPage.dialogs,
    messages: state.chatPage.messages,
    isAuth: state.auth.isAuth,
  };
};

const ChatContainer = connect( mapStateToProps, { addMessage, } )( Chat );

export default ChatContainer;
