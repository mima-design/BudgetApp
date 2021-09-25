import { ADD_CATEGORY, REMOVE_CATEGORY, GET_CATEGORIES, UPDATE_CATEGORY } from "./actions/categories";
import { combineReducers } from 'redux';

export default combineReducers({
  categories
})


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
      idx = new_state.findIndex((item) => item.id == action.data);
      
      if (idx !== -1)
        new_state.splice(idx, 1);

      return new_state
    case UPDATE_CATEGORY:
      new_state = [...state];
      idx = new_state.findIndex((item) => item.id == action.data.id);
      
      if (idx !== -1)
        new_state[idx] = action.data;
      else
        new_state.push(action.data);

      return new_state;
    default:
      return state
  }
}