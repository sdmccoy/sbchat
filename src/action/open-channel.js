export const fetchOpenChannels = channels => ({
  type: 'FETCH_OPENCHANNELS',
  payload: channels,
});

export const createOpenChannel = channel => ({
  type: 'CREATE_OPENCHANNEL',
  payload: channel,
});
