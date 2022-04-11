import React from 'react';

// REDUX
import { connect } from 'react-redux';

// DAL
import {
  loginUserThunkCreator,
  logoutUserThunkCreator,
  getCaptchaUrlThunkCreator
} from 'redux/auth-reducer.ts';

// COMPONENTS
import Login from './Login';
import { Navigate } from 'react-router-dom';

class LoginContainer extends React.Component {
  constructor ( props ) {
    super( props );
  }

  componentDidMount () {
    // console.log( 'LoginContainer: componentDidMount' );
    this.props.getCaptchaURL();
  }

  componentDidUpdate () {
    // console.log( 'LoginContainer: componentDidUpdate', this.props.captchaURL );
  }

  render () {
    if ( this.props.isAuth ){
      return <Navigate to="/profile"/>;
    }

    return <Login isAuth={ this.props.isAuth } captchaURL={ this.props.captchaURL } loginUser={ this.props.loginUser } logoutUser={ this.props.logoutUser } />;
  }

}

const mapStateToProps = ( state ) => {
  return {
    isAuth: state.auth.isAuth,
    captchaURL: state.auth.captchaURL,
  };
};

export default connect( mapStateToProps, { loginUser: loginUserThunkCreator, logoutUser: logoutUserThunkCreator, getCaptchaURL: getCaptchaUrlThunkCreator, } )( LoginContainer );