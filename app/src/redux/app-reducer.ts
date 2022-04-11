// DAL
import {
  getAuthMeThunkCreator
} from './auth-reducer.ts';

export type InitialStateType = {
	isInitialized: boolean,
}

const initialState: InitialStateType = {
  isInitialized: false,
};

// REDUCERS
const appReducer = ( state = initialState, action: any ) : InitialStateType => {
  const { type, } = action;
  switch ( type ){
  case 'SET_INITIALIZED':{
    const { payload: { isInitialized, }, } = action;

    return {
      ...state,
      isInitialized,
    };
  }
  default:{
    return state;
  }
  }
};

// ACTION CREATORS
type SetInitializedActionType = {
	type: 'SET_INITIALIZED',
	payload: any
};
const setInitialized = ( isInitialized ) : SetInitializedActionType => {
  return {
    type: 'SET_INITIALIZED',
    payload: { isInitialized, },
  };
};

// THUNKS ( for async api calls )
const initializeAppThunkCreator = () => ( dispatch: any ) => {
  const promise = dispatch( getAuthMeThunkCreator() );
  Promise.all( [ promise, ] )
    .then( () => {
      dispatch( setInitialized( true ) );
    } );
};

export default appReducer;

export {
  initializeAppThunkCreator
};