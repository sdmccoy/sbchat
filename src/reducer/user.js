
export default (state=[], action) => {
  const {payload, type} = action;
  switch (type) {
  case 'USER_SIGNIN':
    return payload;

  default: return state;

  }
};
