export default (state=[], action) => {
  const {type, payload} = action;

  switch (type) {
  case 'CREATE_OPENCHANNEL':
    return [payload, ...state];
    
  default: return state;
  }
};
