/* global describe, test, expect */
import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe( 'ProfileStatus component', () => {
  test( 'status from props should be in the state', () => {
    const component = create( <ProfileStatus status='test-status'/> );
    const instance = component.getInstance();
    expect( instance.state.status ).toBe( 'test-status' );
  } );
  test( 'after creation span with correct status should be displayed', () => {
    const component = create( <ProfileStatus status='test-status'/> );
    const root = component.root;
    const span = root.findByType( 'span' );
    expect( span ).not.toBeNull();
  } );
  test( 'span inner text === test-status', () => {
    const component = create( <ProfileStatus status='test-status'/> );
    const root = component.root;
    const span = root.findByType( 'span' );
    expect( span.children[0] ).toBe( 'test-status' );
  } );
  test( 'input should be displayed in edit mode', () => {
    const component = create( <ProfileStatus status='test-status'/> );
    const root = component.root;
    const span = root.findByType( 'span' );
    span.props.onDoubleClick();
    // const input = root.findByType( 'input' );
    // expect( input.props.value ).toBe( 'test-status' );
  } );
} );