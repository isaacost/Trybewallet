import { ADD_LOGIN, ADD_COINS, ADD_EXPENSE, REMOVE_EXPENSE } from './actionsTypes';

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

export const removeExpense = (element) => ({
  type: REMOVE_EXPENSE,
  payload: element.id,
});
