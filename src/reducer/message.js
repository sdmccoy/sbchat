export default (state=[], action) => {
  let {type, payload} = action;

  switch (type) {
  case 'SET_PREVIOUSMESSAGES':
    return payload;

  

  default: return state;

  }
};
