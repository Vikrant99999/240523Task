import axios from 'axios'

export const Request = (url, method, params, formDataFlag, headers) => {
  let formData = new FormData();
  for (const key in params) {
    formData.append(key, params[key])
  }
  

  return axios({
    url: url,
    method: method, // default
    headers: buildHeaders(headers),
    // params: params,
    params: !formDataFlag ? method == "get" ? params : null : params,
    data: formDataFlag ? formData : params
  })
}


function buildHeaders(extraHeaders) {
  //const token = JSON.parse(JSON.parse(window.localStorage['persist:warehouse']).access_token);
  let headers = {
    // Pragma: 'no-cache',
    // 'Cache-Control': 'no-cache',
    ...extraHeaders,
  };
  // if (token) {
  //   headers = { ...headers, Authorization: `Bearer ${token}` };
  // }
  return { ...headers };
}