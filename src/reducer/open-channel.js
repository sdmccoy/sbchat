export default (state=[], action) => {
  const {type, payload} = action;

  switch (type) {
  case 'CREATE_OPENCHANNEL':
    return [payload, ...state];

  case 'FETCH_OPENCHANNELS':
    return payload;

  case 'SET_ACTIVECHANNEL':
    return [payload, ...state];

  default: return state;
  }
};
