type DialogType = {
	id: number
	name: string
}
type MessageType = {
	id: number
	text: string
}

const initialState = {
  messages: [
    { id: 0, text: 'Hi', },
    { id: 1, text: 'Hi there!', },
  ] as Array<MessageType>,
  dialogs: [
    { id: 0, name: 'Shao Kahn', },
    { id: 1, name: 'Kung Lao', },
    { id: 2, name: 'Sonya Blade', },
  ] as Array<DialogType>,
};

export type InitialStateType = typeof initialState;

// REDUCERS
const chatReducer = ( state = initialState, action: any ): InitialStateType => {
  const { type, } = action;

  switch ( type ){
  case 'ADD_MESSAGE':{
    const { payload: { text, }, } = action;
    const stateCopy = {
      ...state,
      messages: [ ...state.messages, { id: 3, text: text, }, ],
    };

    return stateCopy;
  }
  default:{
    return state;
  }
  }
};

export default chatReducer;

// ACTION CREATORS
type SendMessageCreatorActionType = {
	type: 'ADD_MESSAGE'
	payload: any
}

const addMessage = ( text: string ) : SendMessageCreatorActionType => {
  return {
    type: 'ADD_MESSAGE',
    payload: { text: text, },
  };
};

export {
  addMessage
};