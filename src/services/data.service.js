import axios from "axios";
import {API_URL} from "../constants";

export const fetchServices = () => {
  return axios.get(API_URL + '/logs/services');
};

export const fetchLogs = () => {
  return axios.get(API_URL + '/logs', {withCredentials: true});
};
