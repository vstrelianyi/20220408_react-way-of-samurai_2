import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const Footer = () => {
  const classes = classNames( [
    styles.Footer,
    'footer',
  ] );

  return (
    <footer className={ classes }>Footer</footer>
  );
};

export default Footer;