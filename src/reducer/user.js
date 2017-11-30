
export default (state=[], action) => {
  const {payload, type} = action;
  switch (type) {
  case 'USER_SIGNIN':
    return [payload, ...state];

  case 'USER_EDITPROFILE':
    var filteredList = state.filter(user => user.userId !== payload.userId);
    return [payload, ...filteredList];

    // case 'ITEM_UPDATE':
    //   return state.map(item => item._id === payload._id ? payload : item);
    //   case 'ITEM_DESTROY':
    // return state.filter(item => item._id !== payload._id);
    
  default: return state;

  }
};
