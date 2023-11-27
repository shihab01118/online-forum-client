import axios from "axios";
// import { clearCookie } from "./auth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_apiURL,
  withCredentials: true,
});

// intercept response and check for anauthorized responses
// axiosSecure.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     if (
//       error.response &&
//       (error.response.status === 401 || error.response.status === 403)
//     ) {
//       await clearCookie();
//       window.location.replace("/login");
//     }

//     return Promise.reject(error);
//   }
// );

export default axiosSecure;
