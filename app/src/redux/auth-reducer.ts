// DAL
import { authAPI, securityAPI } from '../api/api';
import { toast } from 'react-toastify';

export type InitialStateType = {
	userId: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean,
  captchaURL: string | null,
}

const initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaURL: null,
};

// REDUCERS
const authReducer = ( state = initialState, action: any ): InitialStateType => {
  const { type, } = action;
  switch ( type ){
  case 'auth/SET_AUTH_USER_DATA':{
    const { payload: { userId, email, login, isAuth, }, } = action;

    return {
      ...state,
      userId, email, login, isAuth,
    };
  }
  case 'auth/LOGIN_USER':{
    const { payload: { userId, }, } = action;

    return {
      ...state,
      userId: userId,
      isAuth: true,
    };
  }
  case 'auth/LOGOUT_USER':{
    return {
      ...state,
      userId: null,
      email: null,
      login: null,
      isAuth: false,
    };
  }
  case 'auth/SET_CAPTCHA_URL':{
    const { payload: { captchaURL, }, } = action;

    return {
      ...state,
      captchaURL: captchaURL,
    };
  }

  default:{
    return state;
  }
  }
};

export default authReducer;

// ACTION CREATORS
type SetAuthUserDataActionPayloadType = {
	userId: number,
	email: string,
	login: string,
	isAuth: boolean
}
type SetAuthUserDataActionType = {
	type: 'auth/SET_AUTH_USER_DATA',
	payload: SetAuthUserDataActionPayloadType
}
const setAuthUserData = ( userId: number, email: string, login: string, isAuth: boolean ):  SetAuthUserDataActionType => {
  return {
    type: 'auth/SET_AUTH_USER_DATA',
    payload: { userId, email, login, isAuth, },
  };
};

const loginUser = ( userId ) => {
  return {
    type: 'auth/LOGIN_USER',
    payload: { userId, },
  };
};

const logoutUser = () => {
  return {
    type: 'auth/LOGOUT_USER',
    payload: {},
  };
};

type SetCaptchaUrlActionType = {
	type: 'auth/SET_CAPTCHA_URL',
	payload: { captchaURL: string}
}
const setCaptchaUrl = ( captchaURL: string ): SetCaptchaUrlActionType => {
  return {
    type: 'auth/SET_CAPTCHA_URL',
    payload: { captchaURL, },
  };
};

// THUNKS ( for async api calls )
const getAuthMeThunkCreator = () => {
  return async ( dispatch ) => {
    try {
      const response = await authAPI.me();
      const { data: { id, email, login, }, resultCode, messages, } = response;
      if ( resultCode === 0 && id ){
        dispatch( setAuthUserData( id, email, login, true ) );
      }
    }
    catch ( error ){
      console.log( error );
    }

  };
};

type LoginUserData = {
	email: string,
	password: string,
	rememberMe: boolean
}
const loginUserThunkCreator = ( data: LoginUserData ) => {
  // console.log( 'loginUserThunkCreator', data );

  return async ( dispatch ) => {
    try {
      const response = await authAPI.login( data );
      const { data: { resultCode, data: { userId, }, fieldsErrors, },  } = response;
      if ( resultCode === 0 ){
        dispatch( loginUser( userId ) );
        const response = await authAPI.me();
        const { id, email, login, } = response;
        dispatch( setAuthUserData( id, email, login, true ) );
        toast( 'Logged in' );
      }
      else {
        // toast.error( 'Wrong email or password' );
        toast.error( fieldsErrors[0].error );

        return resultCode;
      }
    }
    catch ( error ){
      console.log( error );
    }
  };
};

const logoutUserThunkCreator = () => {
  return async ( dispatch ) => {
    try {
      const response = await authAPI.logout();
      const { data: { resultCode, },  } = response;
      if ( resultCode === 0 ){
        dispatch( logoutUser() );
        toast( 'Logged out' );
      }
    }
    catch ( error ){
      console.log( error );
    }
  };
};

const getCaptchaUrlThunkCreator = () => {
  return async ( dispatch ) => {
    try {
      const response = await securityAPI.getCaptchaURL();
      const { data: { url, },  } = response;
      dispatch( setCaptchaUrl( url ) );
    }
    catch ( error ){
      console.log( error );
    }
  };
};

export {
  setAuthUserData,
  getAuthMeThunkCreator,
  loginUserThunkCreator,
  logoutUserThunkCreator,
  getCaptchaUrlThunkCreator
};