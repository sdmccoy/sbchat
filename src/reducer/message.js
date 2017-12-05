export default (state=[], action) => {
  let {type, payload} = action;

  switch (type) {
  case 'SET_PREVIOUSMESSAGES':
    return payload;

  case 'ADD_NEWMESSAGE':
    return [payload, ...state];

  default: return state;

  }
};
