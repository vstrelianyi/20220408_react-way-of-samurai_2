// https://mortalkombat.fandom.com/wiki/Shao_Kahn/Gallery

// DAL
import { PhotosType, UserType } from 'types/types';
import { usersAPI } from 'api/api';

// IMAGES
// import shao from '../images/users/shao.webp';
// import sonya from '../images/users/sonya.webp';

const initialState = {
  users: [
    // { id: 0, name: 'Shao Kahn', status: '', location: { city: 'Kyiv', country: 'Ukraine', }, followed: true, image: shao, description: '', },
    // { id: 1, name: 'Sonya Blade', status: '', location: { city: 'Kyiv', country: 'Ukraine', }, followed: false, image: sonya, description: '', },
  ] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 10,
  currentPage: 1,
  isLoading: false,
  isButtonsDisabled: [ 0, 1, ] as Array<number>, // array of users id
  userProfile: null,
};

type InitialState = typeof initialState;

// REDUCERS
const usersReducer = ( state = initialState, action: any ): InitialState => {
  const { type, } = action;
  switch ( type ){
  case 'users/FOLLOW_USER':{
    const { payload: { userId, }, } = action;

    return {
      ...state,
      users: state.users.map( user => {
        if ( user.id === userId ){
          return { ...user, followed: true, };
        }

        return user;
      } ),
    };
  }
  case 'users/UNFOLLOW_USER':{
    const { payload: { userId, }, } = action;

    return {
      ...state,
      users: state.users.map( user => {
        if ( user.id === userId ){
          return { ...user, followed: false, };
        }

        return user;
      } ),
    };
  }
  case 'users/SET_USERS':{
    const { payload: { users, }, } = action;

    return {
      ...state,
      users: [
        // ...state.users,
        ...users,
      ],
    };
  }
  case 'users/SET_USER_PROFILE':{
    const { payload: { profile, }, } = action;

    return {
      ...state,
      userProfile: profile,
    };
  }
  case 'users/SET_CURRENT_PAGE':{
    const { payload: { currentPage, }, } = action;

    return {
      ...state,
      currentPage: currentPage,
    };
  }
  case 'users/SET_TOTAL_USERS_COUNT':{
    const { payload: { totalUsers, }, } = action;

    return {
      ...state,
      totalUsersCount: totalUsers,
    };
  }
  case 'users/TOGGLE_IS_LOADING':{
    const { payload: { isLoading, }, } = action;

    return {
      ...state,
      isLoading: isLoading,
    };
  }
  case 'users/TOGGLE_IS_BUTTON_DISABLED':{
    const { payload: { isLoading, userId, }, } = action;

    return {
      ...state,
      isButtonsDisabled: isLoading ?
        [ ...state.isButtonsDisabled, userId, ] :
        state.isButtonsDisabled.filter( id => id != userId ),
    };
  }

  default:{
    return state;
  }
  }
};

export default usersReducer;

// ACTION CREATORS
type FollowUserActionType = {
	type: 'users/FOLLOW_USER',
	payload: any
}
const followUser = ( userId: number ): FollowUserActionType => {
  return {
    type: 'users/FOLLOW_USER',
    payload: { userId, },
  };
};

type UnFollowUserActionType = {
	type: 'users/UNFOLLOW_USER',
	payload: any
}
const unFollowUser = ( userId: number ): UnFollowUserActionType => {
  return {
    type: 'users/UNFOLLOW_USER',
    payload: { userId, },
  };
};

type SetUsersActionType = {
	type: 'users/SET_USERS',
	payload: any
}
const setUsers = ( users: Array<UserType> ): SetUsersActionType => {
  return {
    type: 'users/SET_USERS',
    payload: { users, },
  };
};

type SetUserProfileActionType = {
	type: 'users/SET_USER_PROFILE',
	payload: any
}
const setUserProfile = ( profile: any ): SetUserProfileActionType => {
  return {
    type: 'users/SET_USER_PROFILE',
    payload: { profile, },
  };
};

type SetCurrentPageActionType = {
	type: 'users/SET_CURRENT_PAGE',
	payload: any
}
const setCurrentPage = ( currentPage: number ): SetCurrentPageActionType => {
  return {
    type: 'users/SET_CURRENT_PAGE',
    payload: { currentPage, },
  };
};

type SetTotalUsersCountActionType = {
	type: 'users/SET_TOTAL_USERS_COUNT',
	payload: any
}
const setTotalUsersCount = ( totalUsers: number  ): SetTotalUsersCountActionType => {
  return {
    type: 'users/SET_TOTAL_USERS_COUNT',
    payload: { totalUsers, },
  };
};

type ToggleIsLoadingActionType = {
	type: 'users/TOGGLE_IS_LOADING',
	payload: any
}
const toggleIsLoading = ( isLoading: boolean  ): ToggleIsLoadingActionType => {
  return {
    type: 'users/TOGGLE_IS_LOADING',
    payload: { isLoading, },
  };
};

type ToggleIsButtonsDisabledActionType = {
	type: 'users/TOGGLE_IS_BUTTON_DISABLED',
	payload: any
}
const toggleIsButtonsDisabled = ( isLoading: boolean, userId: number ): ToggleIsButtonsDisabledActionType => {
  return {
    type: 'users/TOGGLE_IS_BUTTON_DISABLED',
    payload: { isLoading, userId, },
  };
};

// THUNKS
const getUsersThunkCreator = ( page: number, pageSize: number, isLoading: boolean ) => {
  return ( dispatch: any ) => {
    dispatch( toggleIsLoading( isLoading ) );

    usersAPI.getUsers( page, pageSize )
      .then( data => {
        const { items, totalCount, } = data;
        dispatch( setTotalUsersCount( totalCount ) );
        dispatch( setUsers( items ) );
        dispatch( toggleIsLoading( false ) );
        dispatch( setCurrentPage( page ) );
      } );
  };
};

const getUserThunkCreator = ( userId: number ) => {
  return async ( dispatch: any ) => {
    dispatch( setUserProfile( null ) );
    try {
      const profile = await usersAPI.getUser( userId );
      console.log( profile );
      dispatch( setUserProfile( profile ) );
    }
    catch ( error ){
      console.log( error );
      dispatch( setUserProfile( undefined ) );
    }
  };
};

const followUserThunkCreator = ( userId: number ) => {
  return async ( dispatch: any ) => {
    dispatch( toggleIsButtonsDisabled( true, userId ) );
    try {
      const response = await usersAPI.follow( userId );
      const { resultCode, } = response;
      if ( resultCode === 0 ){
        dispatch( followUser( userId ) );
        dispatch( toggleIsButtonsDisabled( false, userId ) );
      }
    }
    catch ( error ){
      console.log( error );
      dispatch( setUserProfile( undefined ) );
    }
  };
};

const unFollowUserThunkCreator = ( userId: number ) => {
  return async ( dispatch: any ) => {
    dispatch( toggleIsButtonsDisabled( true, userId ) );
    try {
      const response = await usersAPI.unfollow( userId );
      const { resultCode, } = response;
      if ( resultCode === 0 ){
        dispatch( unFollowUser( userId ) );
        dispatch( toggleIsButtonsDisabled( false, userId ) );
      }
    }
    catch ( error ){
      console.log( error );
      dispatch( setUserProfile( undefined ) );
    }
  };
};

export {
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsLoading,
  getUsersThunkCreator,
  getUserThunkCreator,
  followUserThunkCreator,
  unFollowUserThunkCreator
};