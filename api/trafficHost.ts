import axios from 'axios';

const authHost = axios.create({
  baseURL: 'https://apiadmin.gocuco.com/api',
  headers: {
    'content-type': 'application/json'
  }
});

authHost.interceptors.request.use(async (config) => {
  // Handle token here...
  return config;
});

authHost.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    // Handle error
    return error.response;
  }
);

export default authHost;
