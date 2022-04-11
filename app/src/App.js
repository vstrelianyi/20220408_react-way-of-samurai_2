// STYLES
import classNames from 'classnames/bind';
import styles from './App.module.scss';
import './styles/_globals.scss';

// ROUTER
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// COMPONENTS
import React from 'react';
import HeaderContainer from 'components/Header/HeaderContainer';
import Nav from 'components/Nav/Nav';
// import ProfileContainer from 'components/Profile/ProfileContainer';
const ProfileContainer = React.lazy( () => import( 'components/Profile/ProfileContainer' ) );
import LoginContainer from 'components/Login/LoginContainer';
// import UsersContainer from 'components/Users/UsersContainer';
const UsersContainer = React.lazy( () => import( 'components/Users/UsersContainer' ) );
import UserContainer from 'components/Users/User/UserContainer';
import NoMatch from 'components/NoMatch/NoMatch';
import Toaster from 'components/Toaster/Toaster';
// import ChatContainer from 'components/Chat/ChatContainer';
const ChatContainer = React.lazy( () => import( 'components/Chat/ChatContainer' ) );

import LoaderDots from 'components/Loaders/LoaderDots/LoaderDots';

// DAL
import {
  initializeAppThunkCreator
} from 'redux/app-reducer.ts';

// REDUX
import { connect } from 'react-redux';
import LoaderSpinner from 'components/Loaders/LoaderSpinner/LoaderSpinner';

class AppContainer extends React.Component {
  componentDidMount () {
    this.props.initializeApp();
  }

  render () {
    const classes = classNames( [
      styles.App,
      'app',
    ] );

    if ( !this.props.isInitialized ){
      return (
        <div className="splash-screen">
          <LoaderSpinner isLoading={ true } size="big"/>
        </div>
      );
    }

    return (
      <HelmetProvider>
        <BrowserRouter
          // basename={ process.env.PUBLIC_URL }
        >
          <div className={ classes }>
            <Helmet>
              <meta charSet="utf-8" />
              <title>Samurai chat</title>
              <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <HeaderContainer/>
            <Nav/>
            <main className="main">
              <Routes>
                <Route path="/" element={ <h1>Home</h1> } />
                <Route path="/profile" element={ <React.Suspense fallback={ <LoaderDots isLoading={ true }/> }><ProfileContainer/></React.Suspense> } />
                <Route path="/chat" element={ <React.Suspense fallback={ <LoaderDots isLoading={ true }/> }><ChatContainer/></React.Suspense> } />
                <Route path="/news" element={ <h1>news</h1> } />
                <Route path="/music" element={ <h1>music</h1> } />
                { /* <Route path="/users" element={ <Users/> } >
									<Route path=":userId" element={ <SingleUser/> } />
								</Route> */ }
                <Route path="/users" element={ <React.Suspense fallback={ <LoaderDots isLoading={ true }/> }><UsersContainer/></React.Suspense> } />
                <Route path="/users/:userId" element={ <UserContainer/> } />
                <Route path="/settings" element={ <h1>settings</h1> } />
                <Route path="/login" element={ <LoginContainer/> } />
                <Route path="*" element={ <NoMatch/> } />
              </Routes>

              <Toaster/>
            </main>
          </div>
        </BrowserRouter>
      </HelmetProvider>
    );
  }

}

const mapStateToProps = ( state ) => {
  return {
    isInitialized: state.app.isInitialized,
  };
};

export default connect( mapStateToProps, { initializeApp: initializeAppThunkCreator, } )( AppContainer );
