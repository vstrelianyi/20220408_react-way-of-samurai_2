import axios from 'axios';

const instance = axios.create(
  {
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
      'API-KEY': 'bfafa524-74eb-4f38-9d5f-3510957232c7',
    },
  }
);

const usersAPI = {
  getUsers ( currentPage, pageSize ) {
    return instance.get( `users?page=${ currentPage }&count=${ pageSize }` )
      .then( res => res.data )
      .catch( error => {
        console.log( error );
      } );
  },

  getUser ( userId ) {
    return instance.get( `profile/${ userId }` )
      .then( res => res.data )
      .catch( error => {
        console.log( error );
      } );
  },

  follow ( userId ) {
    return instance.post( `follow/${ userId }` )
      .then( res => res.data )
      .catch( error => {
        console.log( 'API.follow', error );
      } );
  },

  unfollow ( userId ) {
    return instance.delete( `follow/${ userId }` )
      .then( res => res.data )
      .catch( error => {
        console.log( 'API.unfollow', error );
      } );
  },
};

const profileAPI = {
  getProfile ( userId ) {
    return instance.get( `profile/${ userId }` )
      .then( res => res.data )
      .catch( error => {
        console.log( error );
      } );
  },
  getStatus ( userId ) {
    return instance.get( `profile/status/${ userId }` )
      .then( res => res.data )
      .catch( error => {
        console.log( error );
      } );
  },
  updateStatus ( status ) {
    return instance.put( 'profile/status', { status: status, } )
      .then( res => res.data )
      .catch( error => {
        console.log( error );
      } );
  },
  uploadPhoto ( photoFile ) {
    const formData = new FormData();
    formData.append( 'image', photoFile );

    return instance.put( 'profile/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    } )
      .then( res => res.data )
      .catch( error => {
        console.log( error );
      } );
  },
  updateProfile ( valuesObj ) {
    return instance.put( 'profile', valuesObj )
      .then( res => res.data )
      .catch( error => {
        console.log( error );
      } );
  },
};

const authAPI = {
  me () {
    return instance.get( 'auth/me' )
      .then( res => res.data )
      .catch( error => {
        console.log( error );
      } );
  },
  login ( data ) {
    return instance.post( 'auth/login', data )
      .then( res => {
        return res;
      } )
      .catch( error => {
        console.log( error );
      } );
  },
  logout () {
    return instance.delete( 'auth/login' )
      .then( res => {
        return res;
      } )
      .catch( error => {
        console.log( error );
      } );
  },
};

const securityAPI = {
  getCaptchaURL () {
    return instance.get( 'security/get-captcha-url' )
      .then( res => {
        return res;
      } )
      .catch( error => {
        console.log( error );
      } );
  },
};

export {
  usersAPI,
  authAPI,
  profileAPI,
  securityAPI
};