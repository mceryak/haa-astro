import { queryParams } from "../store";

window.addEventListener("load", () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = urlSearchParams.keys().reduce((acc, key) => {
    const decodedValue = decodeURIComponent(urlSearchParams.get(key)).split(",");
    acc.set(key, decodedValue.at(0) === '' ? [] : decodedValue);
    return acc;
    // return { ...acc, [key]: decodedValue.at(0) === "" ? [] : decodedValue };
  }, new Map());
  console.log('the map', params);
  queryParams.set(params);

  // let m = new Map();
  // Object.keys(params).forEach((k) => m.set(k, params[k]));
  // queryParams.set(m);
});