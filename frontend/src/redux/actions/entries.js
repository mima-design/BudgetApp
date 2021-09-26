import axiosRequests from "../../axiosShortcuts";

export const ENTRY_TYPE = {
  expenses: 0,
  income: 1
}

export const ADD_ENTRY = "ADD_ENTRY";
export const REMOVE_ENTRY = "REMOVE_ENTRY";

export const addEntry = (data) => ({
  type: ADD_ENTRY,
  data,
});

export const removeEntry = (data) => ({
  type: REMOVE_ENTRY,
  data,
});

export function postEntry(data) {
  return function(dispatch) {
    return axiosRequests.post(
      "/entry/",
      data,
      ({data}) => {
        dispatch(addEntry(data));
      }
    );
  }
}

export function deleteEntry(id, budgetId) {
  return function(dispatch) {
    return axiosRequests.delete(
      `/entry/${id}/`,
      () => {
        dispatch(removeEntry({budgetId, id}));
      }
    );
  }
}
