import { queryParams } from "../store";

window.addEventListener("load", () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = [...urlSearchParams.keys()].reduce((acc, key) => {
    const decodedValue = decodeURIComponent(urlSearchParams.get(key)).split(",");
    return { ...acc, [key]: decodedValue.at(0) === "" ? [] : decodedValue };
  }, {});
  queryParams.set(params);

  // const decodedValue = decodeURIComponent(urlSearchParams.get(key)).split(",");
  // acc.set(key, decodedValue.at(0) === '' ? [] : decodedValue);
  // return acc;
  // let m = new Map();
  // Object.keys(params).forEach((k) => m.set(k, params[k]));
  // queryParams.set(m);
});