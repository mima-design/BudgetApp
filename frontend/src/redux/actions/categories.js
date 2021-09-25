import axiosRequests from "../../axiosShortcuts";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";

export const getCategories = (data) => ({
  type: GET_CATEGORIES,
  data,
})

export const addCategory = (data) => ({
  type: ADD_CATEGORY,
  data,
})

export const removeCategory = (data) => ({
  type: REMOVE_CATEGORY,
  data,
})

export const updateCategory = (data) => ({
  type: UPDATE_CATEGORY,
  data,
})

export function getCategoriesData(callback = () => null, query = "") {
  return function(dispatch) {
    return axiosRequests.get(
      `/category/${query}`,
      (respData) => {
        dispatch(getCategories(respData.data.results));
        callback(respData.data);
      }
    );
  }
}

export function postCategory(data) {
  return function(dispatch) {
    return axiosRequests.post(
      "/category/",
      data,
      (respData) => {
        dispatch(addCategory(respData.data));
      }
    );
  }
}

export function deleteCategory(id) {
  return function(dispatch) {
    return axiosRequests.delete(
      `/category/${id}`,
      (respData) => {
        dispatch(removeCategory(id));
      }
    )
  }
}

export function putCategory(id, data) {
  return function(dispatch) {
    return axiosRequests.put(
      `/category/${id}`,
      data,
      (respData) => {
        dispatch(updateCategory(respData.data));
      }
    )
  }
}
