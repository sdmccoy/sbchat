export const setPreviousMessageList = previousMessages => ({
  type: 'SET_PREVIOUSMESSAGES',
  payload: previousMessages,
});

export const addNewMessage = message => ({
  type: 'ADD_NEWMESSAGE',
  payload: message,
});
