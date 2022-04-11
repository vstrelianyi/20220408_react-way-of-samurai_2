import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// STATE
// import store from './redux/store';
import store from './redux/redux-store';
import { Provider } from 'react-redux';

// setInterval( () => {
//   store.dispatch( { type: 'FAKE', } );
// }, 1000 );

const container = document.getElementById( 'root' );
const root = ReactDOM.createRoot( container );

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App/>
    </Provider>
  </React.StrictMode>
);
