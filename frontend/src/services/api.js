import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const predictFraud = (data) => API.post("/predict", data);

export const getClaims = () => API.get("/claims");

export default API;

