export default (state=[], action) => {
  let {type, payload} = action;
  console.log('part list payload = ', payload);
  switch (type) {
  case 'SET_PARTICIPANTLIST':
    return payload;

  default: return state;
  }
};
