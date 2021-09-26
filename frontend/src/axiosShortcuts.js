import axios from "axios";
import Toast from "./components/toast";

function axiosFail(respError) {
  new Toast({message: respError, type: "danger"});
}

function emptySuccessCallback() {}

const axiosRequests = {
  get: (url, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'GET',
      url: url,
    })
    .then(success)
    .catch(fail);
  },
  post: (url, data, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'POST',
      url: url,
      data
    })
    .then(success)
    .catch(fail);
  },
  put: (url, data, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'PUT',
      url: url,
      data
    })
    .then(success)
    .catch(fail);
  },
  delete: (url, success = emptySuccessCallback, fail = axiosFail) => {
    return axios({
      method: 'DELETE',
      url: url
    })
    .then(success)
    .catch(fail);
  },
  checkForToken: () => {
    const token = localStorage.getItem("token");
    
    if (token)
      axios.defaults.headers.common['Authorization'] = token;  
    

    return !!token
  },
  setAuthToken: (token) => {
    axios.defaults.headers.common['Authorization'] = token;
    localStorage.setItem("token", token);
  },
  removeAuthToken: () => {
    localStorage.clear()
  }
};

export default axiosRequests;