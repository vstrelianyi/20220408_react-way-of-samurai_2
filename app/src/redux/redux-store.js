import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import profileReducer from 'redux/profile-reducer.ts';
import usersReducer from 'redux/users-reducer.ts';
import chatReducer from 'redux/chat-reducer.ts';
import authReducer from 'redux/auth-reducer.ts';
import appReducer from 'redux/app-reducer.ts';

const reducers = combineReducers(
  {
    profilePage: profileReducer,
    chatPage: chatReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
  }
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore( reducers, composeEnhancers(
  applyMiddleware( thunkMiddleware )
) );

window.store = store;

export default store;