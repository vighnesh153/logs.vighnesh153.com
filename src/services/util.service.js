import qs from "qs";

const transformMeta = (meta) => {
  const result = {...meta};
  result.time = new Date(meta.time).toLocaleString();
  // delete result.service;
  delete result.requestId;
  return result;
};

export const transformLog = (log) => {
  return {
    id: log._id,
    requestId: log.meta.requestId,
    level: log.level,
    message: log.message,
    meta: JSON.stringify(transformMeta(log.meta), null, 4)
  };
};

export const searchifyQuery = (query) => {
  return qs.stringify(query);
}

export const parseQuery = (query) => {
  const q = `${query}`;
  return qs.parse(q.startsWith('?') ? q.slice(1) : q);
};
