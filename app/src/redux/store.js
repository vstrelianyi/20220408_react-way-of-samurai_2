import profileReducer from './profile-reducer';
import chatReducer from './chat-reducer';

const store = {
  _state: {
    profilePage: {
      posts: [
        { id: 0, message: 'I\'m from Kyiv, It my post', likesCount: 12, },
        { id: 1, message: 'Its my first post', likesCount: 10, },
      ],
      newPostText: '',
    },

    chatPage: {
      messages: [
        { id: 0, text: 'Hi', },
        { id: 1, text: 'Hi there!', },
      ],

      dialogs: [
        { id: 0, name: 'Andrew', },
        { id: 1, name: 'Alex', },
        { id: 2, name: 'Sonya', },
      ],
      newMessageText: '',
    },
  },
  _callSubscriber ( state ) {
    this._render( state );
  },
  getState () {
    return this._state;
  },
  subscribe ( observer ) {
    this._render = observer;
  },
  dispatch ( action ) {
    this._state.profilePage = profileReducer( this._state.profilePage, action );
    this._state.chatPage = chatReducer( this._state.chatPage, action );

    this._callSubscriber( this._state );
  },
};

window.store = store;

export default store;
