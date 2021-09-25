import { ADD_CATEGORY, REMOVE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from "./actions/categories";
import { ADD_BUDGET, REMOVE_BUDGET, GET_BUDGETS, UPDATE_BUDGET, PAGE_SIZE } from "./actions/budgets";
import { combineReducers } from 'redux';
import { ADD_ENTRY, REMOVE_ENTRY } from "./actions/entries";
import { GET_CURRENT_USER, GET_USERS } from "./actions/users";

export default combineReducers({
  categories, budgets, users, info
})

function users(state = [], action) {
  switch (action.type) {
    case GET_USERS: 
      return action.data;
    default:
      return state;
  }
}

function info(state = {}, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return action.data;
    default:
      return state;
  }
}


function categories(state = [], action) {
  let new_state;
  let idx;
  
  switch (action.type) {
    case ADD_CATEGORY: 
      new_state = [...state];
      new_state.push(action.data);
      return new_state;
    case GET_CATEGORIES:
      return action.data;
    case REMOVE_CATEGORY:
      new_state = [...state];
      idx = new_state.findIndex((item) => item.id === action.data);
      
      if (idx !== -1)
        new_state.splice(idx, 1);

      return new_state
    case UPDATE_CATEGORY:
      new_state = [...state];
      idx = new_state.findIndex((item) => item.id === action.data.id);
      
      if (idx !== -1)
        new_state[idx] = action.data;
      else
        new_state.push(action.data);

      return new_state;
    default:
      return state
  }
}

function budgets(state = [], action) {
  let new_state;
  let idx;
  
  switch (action.type) {
    case ADD_BUDGET:
      if (state.length > PAGE_SIZE)
        return state;
        
      new_state = [...state]; //making shallow copy
      new_state.push(action.data);
      return new_state;
    case GET_BUDGETS:
      return action.data;
    case REMOVE_BUDGET:
      new_state = [...state];
      idx = new_state.findIndex((item) => item.id === action.data);
      
      if (idx !== -1)
        new_state.splice(idx, 1);

      return new_state
    case UPDATE_BUDGET:
      new_state = [...state];
      idx = new_state.findIndex((item) => item.id === action.data.id);
      
      if (idx !== -1)
        new_state[idx] = action.data;
      else
        new_state.push(action.data);

      return new_state;
    case ADD_ENTRY:
      new_state = [...state];
      const budget = new_state.find((item) => item.id === action.data.budget);
      budget.budget_entry.push(action.data);
      return new_state;
    case REMOVE_ENTRY:
      new_state = [...state];
      const new_budget = new_state.find((item) => item.id === action.data.budgetId);
      idx = new_budget.budget_entry.findIndex((entry) => entry.id === action.data.id);
      new_budget.budget_entry.splice(idx, 1)
      return new_state;
    default:
      return state
  }
}