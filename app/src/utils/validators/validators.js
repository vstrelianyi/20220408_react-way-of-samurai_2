const required = ( value ) => {
  if ( value ) return undefined;

  return 'Field is required';
};

const maxLengthCreator = ( maxLength ) => ( value ) => {
  if ( value?.length <= maxLength ) return undefined;

  return `Max length is ${ maxLength } chars`;
};

const minLengthCreator = ( minLength ) => ( value ) => {
  if ( value?.length >= minLength ) return undefined;

  return `Min length is ${ minLength } chars`;
};

const composeValidators = ( ...validators ) => value => {
  return validators.reduce( ( error, validator ) => error || validator( value ), undefined );
};

const mustBeNumber = value => ( isNaN( value ) ? 'Must be a number' : undefined );

export {
  composeValidators,
  required,
  maxLengthCreator,
  minLengthCreator,
  mustBeNumber
};