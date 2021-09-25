import axiosRequests from "../../axiosShortcuts";

export const GET_USERS = "GET_USERS";
export const GET_CURRENT_USER = "GET_CURRENT_USER";

const retrieveUsers = (data) => ({
  type: GET_USERS,
  data,
});

const retrieveCurrentUser = (data) => ({
  type: GET_CURRENT_USER,
  data,
});

export function getUsers() {
  return function(dispatch) {
    return axiosRequests.get(
      "/user/",
      ({data}) => {
        dispatch(retrieveUsers(data.results));
      }
    );
  }
}

export function getCurrentUser(callback = () => null) {
  return function(dispatch) {
    return axiosRequests.get(
      "/user/current/",
      ({data}) => {
        dispatch(retrieveCurrentUser(data));
        callback();
      }
    );
  }
}

