// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_LOGIN:
    return {
      email: action.email,
    };
  default:
    return state;
  }
}

export default user;
