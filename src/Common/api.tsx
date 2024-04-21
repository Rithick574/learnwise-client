import axios from "axios";


// export const URL = "https://learnwise.today/api";
export const URL = "http://localhost:4000/api";

const apiInstance = axios.create({
    baseURL: URL,
  });