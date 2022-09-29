// ACTIONS TYPES
export const ADD_LOGIN = 'ADD_LOGIN';

// ACTIONS CREATORS
export const addLogin = (email) => ({
  type: ADD_LOGIN,
  email,
});
