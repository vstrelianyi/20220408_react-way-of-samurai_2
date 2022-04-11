import styles from './Toaster.module.scss';
import classNames from 'classnames';

// import { useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// https://fkhadra.github.io/react-toastify/update-toast/#update-the-content

const Toaster = ( props ) => {
  const classes = classNames( [
    styles.Toaster,
  ] );

  return (
    <ToastContainer
      className={ classes }
      autoClose={ 2000 }
      pauseOnHover= { false }
      pauseOnFocusLoss={ false }
    />
  );
};

export default Toaster;