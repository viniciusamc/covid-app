import axios from "axios";

export const api = axios.create({
  baseURL: "https://covid19-brazil-api.now.sh/api/report/v1/",
});

export const apiStatus = axios.create({
  baseURL: "https://covid19-brazil-api.now.sh/api/status/v1",
});
