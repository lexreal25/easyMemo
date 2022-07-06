import axios from "axios";

const BASE_URL = "http://localhost:4000/api/memo/";
export const publicRequest = axios.create({
  baseUrl: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token:
      "Bearer " +
      JSON.stringify(JSON.parse(localStorage.getItem("persist:user")).user)
        .currentUser?.accessToken,
  },
});
