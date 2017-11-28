
export default (state=[], action) => {
  const {payload, type} = action;
  switch (type) {
  case 'USER_SET':
    return payload;

  default: return state;

  }
};
