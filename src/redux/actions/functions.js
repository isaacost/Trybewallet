import { addCoins, addExpense } from './index';

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
