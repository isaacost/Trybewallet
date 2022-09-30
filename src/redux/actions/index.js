// ACTIONS TYPES
export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_COINS = 'ADD_COINS';
export const ADD_EXPENSE = 'ADD_EXPENSE';

// ACTIONS CREATORS
export const addLogin = (email) => ({
  type: ADD_LOGIN,
  email,
});

export const addCoins = (coins) => ({
  type: ADD_COINS,
  payload: Object.keys(coins).filter((element) => element !== 'USDT'),
});

export const addExpense = (expense, cambio) => ({
  type: ADD_EXPENSE,
  payload: {
    ...expense,
    exchangeRates: cambio,
  },
});

// FUNÇÕES

export function fetchAPICoins() {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endpoint);
    const response = await data.json();
    dispatch(addCoins(response));
  };
}

export function fetchAPIExpense(expense) {
  return async (dispatch) => {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const data = await fetch(endpoint);
    const response = await data.json();
    dispatch(addExpense(expense, response));
  };
}
