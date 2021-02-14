import axios from "axios";
import {API_URL, LOGS_PER_PAGE} from "../constants";

import * as util from "./util.service";

export const fetchServices = ({setServices, handleError}) => {
  axios.get(API_URL + '/logs/services')
    .then(res => {
      if (res.data.status === 200) {
        setServices(res.data.data);
      } else {
        handleError({
          message: (res.data && res.data.message) || 'Please contact admin.',
        });
      }
    })
    .catch(handleError);
};

export const fetchLogs = ({setLogs, handleError, config, setLoading}, filtersDraft, page=1) => {
  const filters = {};
  if (filtersDraft.service && filtersDraft.service !== 'all') {
    filters["meta.service"] = filtersDraft.service;
  }
  if (filtersDraft.requestId) {
    filters["meta.requestId"] = { $regex : "^" + filtersDraft.requestId };
  }
  if (filtersDraft.logLevel && filtersDraft.logLevel !== 'all') {
    filters.level = filtersDraft.logLevel;
  }

  const pagination = {
    skip: (page - 1) * LOGS_PER_PAGE,
    limit: LOGS_PER_PAGE,
  };

  const query = {filters, pagination};
  axios.get(`${API_URL}/logs?${util.searchifyQuery(query)}`, {withCredentials: true})
    .then((res) => {
      if (config.doProcess === false) {
        return;
      }
      if (res.status === 200) {
        const logs = res.data.map(util.transformLog);
        if (page === 1) {
          setLogs([]);
          setTimeout(() => setLogs(logs), 0);
        } else {
          setLogs(p => ([...p, ...logs]))
        }
      } else {
        handleError({message: (res.data && res.data.message) || 'Some error occurred.'})
      }
    })
    .catch((err) => {
      if (config.doProcess === false) {
        return;
      }
      handleError(err);
    })
    .finally(() => {
      if (config.doProcess === false) {
        return;
      }
      setLoading(false);
    });
};
