import React from 'react';

// STYLES
import classNames from 'classnames/bind';
import styles from './ProfileStatus.module.scss';

class ProfileStatus extends React.Component {
  constructor ( props ) {
    super( props );

    this.state = {
      editMode: false,
      status: this.props.status,
    };

    this.input = React.createRef( null );
  }

  activateEditMode () {
    this.setState( { editMode: true, } );
  }

  deactivateEditMode () {
    this.setState( { editMode: false, } );
    this.props.setUserStatus( this.state.status );
  }

  handleInputChange ( e ) {
    const value = e.target.value;
    this.setState( { status: value, } );
  }

  handleKeyPress ( e ) {
    if ( e.key === 'Enter' ){
      this.setState( { editMode: false, } );
      this.props.setUserStatus( this.state.status );
    }
  }

  componentDidUpdate ( prevProps, prevState ) {
    // console.log( 'componentDidUpdate', prevProps, prevState );
    if ( this.state.editMode ){
      this.input.current.focus();
    }
    // if ( this.props.status !== this.state.status ){
    //   this.setState( { status: this.props.status, } );
    // }
  }

  render () {
    const classes = classNames( [
      styles.ProfileStatus,
      'profile-status',
    ] );

    return (
      <div className={ classes }>
        { this.state.editMode ?
          <input
            value={ this.state.status }
            ref={ this.input }
            onChange={ this.handleInputChange.bind( this ) }
            onBlur={ this.deactivateEditMode.bind( this ) }
            onKeyPress={ this.handleKeyPress.bind( this ) }
          /> :
          <span onDoubleClick={ this.activateEditMode.bind( this ) }>{ this.state.status }</span>
        }
      </div>
    );
  }

}

export default ProfileStatus;