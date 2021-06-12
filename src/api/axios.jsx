import axios from "axios";

// Base URL to make reuest to the movie database.
const instance = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export default instance;
