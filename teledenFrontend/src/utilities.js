import qs from "query-string";
import { cloneDeep } from "lodash";

export function getQueryParams(query = "") {
  const params = query?.split("?")[1];
  const paramsArr = params?.split("&");
  let paramsObj = {};
  paramsArr?.length &&
    paramsArr.forEach((param, index) => {
      const arr = param.split("=");
      paramsObj = { ...paramsObj, [arr[0]]: arr[1] };
    });
  return paramsObj;
}

export function formatUrl(url, queryParam) {
  if (Object.keys(queryParam).length !== 0) {
    queryParam = qs.stringify(queryParam);
    return `${url}?${queryParam}`;
  }
  return url;
}

// For updating React Query cache

export function updateCache(queryKey, queryClient, update) {
  queryClient.cancelQueries(queryKey);
  // Snapshot of the previous value
  const previousData = queryClient.getQueryData(queryKey);
  // To avoid mutating previousData
  let updatedData = cloneDeep(previousData);
  update(updatedData, previousData);
}

export function convertObjectToFormData(object, priorToConversion = () => {}) {
  let formData = new FormData();
  priorToConversion(formData);
  for (let item in object) {
    if (Array.isArray(object[item])) {
      for (let i of object[item]) formData.append(`location[${item}][]`, i);
    } else {
      formData.append(`location[${item}]`, object[item]);
    }
  }
  return formData;
}
