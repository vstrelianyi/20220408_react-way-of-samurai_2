/* global it, expect */

import profileReducer, {
  addPost,
  deletePost
} from 'redux/profile-reducer.ts';

const state = {
  posts: [
    { id: 0, message: 'I\'m from Kyiv, It my post', likesCount: 12, },
    { id: 1, message: 'Its my first post', likesCount: 10, },
  ],
};

it( 'length of posts should be incremented', () => {
  // test data

  const action = addPost( 'it-kamasutra.com' );

  // action
  const newState = profileReducer( state, action );

  // expectation
  expect( newState.posts.length ).toBe( 3 );
} );

it( 'message of new post should be correct', () => {
  // test data
  const action = addPost( 'it-kamasutra.com' );

  // action
  const newState = profileReducer( state, action );

  // expectation
  expect( newState.posts[ 2 ].message ).toBe(  'it-kamasutra.com' );
} );

it( 'length of posts should decrement', () => {
  // test data
  const action = deletePost( 1 );

  // action
  const newState = profileReducer( state, action );

  // expectation
  expect( newState.posts.length ).toBe( 1 );
} );

it( 'length of posts shouldn\'t decrement if postId is wrong', () => {
  // test data
  const action = deletePost( 10 );

  // action
  const newState = profileReducer( state, action );

  // expectation
  expect( newState.posts.length ).toBe( 2 );
} );