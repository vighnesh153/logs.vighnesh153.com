export const transformMeta = (meta) => {
  const result = {...meta};
  result.time = new Date(meta.time).toLocaleString();
  delete result.service;
  delete result.requestId;
  return result;
};
