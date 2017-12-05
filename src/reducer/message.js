export default (state=[], action) => {
  let {type, payload} = action;

  switch (type) {
  case 'SET_PREVIOUSMESSAGES':
    return payload;

  case 'ADD_NEWMESSAGE':
    return [...state, payload];

  case 'DELETE_MESSAGE':
    return  state.filter(message => message.messageId !== payload.messageId);


  default: return state;

  }
};
