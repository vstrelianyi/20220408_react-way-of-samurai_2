// DAL
// import LoginContainer from 'components/Login/LoginContainer';
import { usersAPI, profileAPI } from 'api/api';

import {
  PostType,
  ContactsType,
  PhotosType,
  ProfileType
} from 'types/types';

const initialState = {
  posts: [
    { id: 0, message: 'I\'m from Kyiv, It my post', likesCount: 12, },
    { id: 1, message: 'Its my first post', likesCount: 10, },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: 'empty status',
};
export type InitialStateType = typeof initialState;

// REDUCERS
const profileReducer = ( state = initialState, action: any ): InitialStateType => {
  const { type, } = action;
  switch ( type ){
  case 'profile/ADD_POST':{
    const { payload: { text, }, } = action;

    return {
      ...state,
      posts: [ ...state.posts, { id: 10, message: text, likesCount: 12, }, ],
    };
  }
  case 'profile/DELETE_POST': {
    const { payload: { postId, }, } = action;

    return {
      ...state,
      posts: state.posts.filter( post => post.id !== postId ),
    };
  }
  case 'profile/SET_USER_PROFILE':{
    const { payload: { profile, }, } = action;

    return {
      ...state,
      profile,
    };
  }
  case 'profile/SET_USER_STATUS':{
    const { payload: { status, }, } = action;

    return {
      ...state,
      status: status,
    };
  }
  case 'profile/SET_USER_PHOTO':{
    const { payload: { photos, }, } = action;

    return {
      ...state,
      profile: { ...state.profile, photos: photos, },
    };
  }
  case 'profile/UPDATE_USER_PROFILE':{
    const { payload: { valuesObj, }, } = action;

    return {
      ...state,
      profile: { ...state.profile, ...valuesObj, },
    };
  }
  default:{
    return state;
  }
  }
};

export default profileReducer;

// ACTION CREATORS
type AddPostType = {
	type: 'profile/ADD_POST',
	payload: any
}
const addPost = ( text: string ): AddPostType => {
  return {
    type: 'profile/ADD_POST',
    payload: { text, },
  };
};

type DeletePostType = {
	type: 'profile/DELETE_POST',
	payload: any
}
const deletePost = ( postId: number ): DeletePostType => {
  return {
    type: 'profile/DELETE_POST',
    payload: { postId, },
  };
};

type SetUserProfileType = {
	type: 'profile/SET_USER_PROFILE',
	payload: any
}
const setUserProfile = ( profile: ProfileType ): SetUserProfileType => {
  return {
    type: 'profile/SET_USER_PROFILE',
    payload: { profile, },
  };
};

type SetUserStatusType = {
	type: 'profile/SET_USER_STATUS',
	payload: any
}
const setUserStatus = ( status: string ): SetUserStatusType => {
  return {
    type: 'profile/SET_USER_STATUS',
    payload: { status, },
  };
};

type SetUserPhotoType = {
	type: 'profile/SET_USER_PHOTO',
	payload: any
}
const setUserPhoto = ( photos: Array<PhotosType> ): SetUserPhotoType => {
  return {
    type: 'profile/SET_USER_PHOTO',
    payload: { photos, },
  };
};

type UpdateUserProfileType = {
	type: 'profile/UPDATE_USER_PROFILE',
	payload: any
}
const updateUserProfile = ( valuesObj: any ): UpdateUserProfileType => {
  return {
    type: 'profile/UPDATE_USER_PROFILE',
    payload: { valuesObj, },
  };
};

// THUNKS
const getUserProfileThunkCreator = ( userId ) => {
  return async ( dispatch ) => {
    dispatch( setUserProfile( null ) );
    try {
      const response = await usersAPI.getUser( userId );
      const profile = response;
      dispatch( setUserProfile( profile ) );
    }
    catch ( error ){
      console.log( error );
      dispatch( setUserProfile( undefined ) );
    }
  };
};

const getUserStatusThunkCreator = ( userId ) => {
  return async ( dispatch ) => {
    try {
      const response = await profileAPI.getStatus( userId );
      const status = response;
      dispatch( setUserStatus( status ) );
    }
    catch ( error ){
      console.log( error );
      dispatch( setUserProfile( undefined ) );
    }
  };
};

const setUserStatusThunkCreator = ( status ) => {
  return async ( dispatch ) => {
    try {
      const response = await profileAPI.updateStatus( status );
      const { resultCode, } = response;
      if ( resultCode === 0 ){
        dispatch( setUserStatus( status ) );
      }
    }
    catch ( error ){
      console.log( error );
      dispatch( setUserProfile( undefined ) );
    }
  };
};

const uploadPhotoThunkCreator = ( photoFile ) => {
  return async ( dispatch ) => {
    try {
      const response = await profileAPI.uploadPhoto( photoFile );
      const { resultCode, data: { photos, }, } = response;
      if ( resultCode === 0 ){
        dispatch( setUserPhoto ( photos ) );
      }
    }
    catch ( error ){
      console.log( error );
      dispatch( setUserPhoto( undefined ) );
    }
  };
};

const updateProfileThunkCreator = ( valuesObj ) => {
  return async ( dispatch ) => {
    try {
      console.log( valuesObj );
      const response = await profileAPI.updateProfile( valuesObj );
      const { resultCode, data, } = response;
      if ( resultCode === 0 ){
        dispatch( updateUserProfile ( valuesObj ) );
      }
    }
    catch ( error ){
      console.log( error );
      // dispatch( updateUserProfile( undefined ) );
    }
  };
};

export {
  addPost,
  deletePost,
  getUserProfileThunkCreator,
  getUserStatusThunkCreator,
  setUserStatusThunkCreator,
  uploadPhotoThunkCreator,
  updateProfileThunkCreator
};