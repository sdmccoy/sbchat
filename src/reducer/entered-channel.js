export default (state = [], action) => {
  const {payload, type} = action;

  switch (type) {
  case 'SET_ENTEREDCHANNEL':
    console.log('payload = ', payload);
    return payload;

  default: return state;
  }

};
