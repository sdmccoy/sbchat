export default (state=[], action) => {
  const {type, payload} = action;
  switch (type) {
  case 'CREATE_OPENCHANNEL':
    return payload;
  default: return state;
  }
};
