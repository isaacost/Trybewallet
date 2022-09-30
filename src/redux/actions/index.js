// ACTIONS TYPES
export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_COINS = 'ADD_COINS';

// ACTIONS CREATORS
export const addLogin = (email) => ({
  type: ADD_LOGIN,
  email,
});

export const addCoins = (coins) => ({
  type: ADD_COINS,
  payload: Object.keys(coins).filter((element) => element !== 'USDT'),
});

export function fetchAPI() {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endpoint);
    const response = await data.json();
    dispatch(addCoins(response));
  };
}
