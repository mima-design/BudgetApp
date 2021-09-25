import axiosRequests from "../../axiosShortcuts";

export const GET_BUDGETS = "GET_BUDGETS";
export const ADD_BUDGET = "ADD_BUDGET";
export const REMOVE_BUDGET = "REMOVE_BUDGET";
export const UPDATE_BUDGET = "UPDATE_CATEGORY";
export const PAGE_SIZE = 3;


export const getBudgets = (data) => ({
  type: GET_BUDGETS,
  data,
})

export const addBugdet = (data) => ({
  type: ADD_BUDGET,
  data,
})

export const removeBudget = (data) => ({
  type: REMOVE_BUDGET,
  data,
})

export const updateBudget = (data) => ({
  type: UPDATE_BUDGET,
  data,
})

export function getBudgetsData( query = "", callback = () => null) {
  return function(dispatch) {
    return axiosRequests.get(
      `/budget/${query}`,
      ({data}) => {
        dispatch(getBudgets(data.results));
        callback(data);
      }
    );
  }
}

export function postBudget(data, callback = () => null) {
  return function(dispatch) {
    return axiosRequests.post(
      "/budget/",
      data,
      ({data}) => {
        dispatch(addBugdet(data));
        callback(data);
      }
    );
  }
}

export function deleteBudget(id) {
  return function(dispatch) {
    return axiosRequests.delete(
      `/budget/${id}/`,
      ({data}) => {
        dispatch(removeBudget(id));
      }
    )
  }
}

export function putBudget(id, data) {
  return function(dispatch) {
    return axiosRequests.put(
      `/budget/${id}/`,
      data,
      ({data}) => {
        dispatch(updateBudget(data));
      }
    )
  }
}
