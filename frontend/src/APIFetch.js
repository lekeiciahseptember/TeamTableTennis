//fetch function to be used in each of the api requests

export default async function ApiFetch(url, methods, data, token) {
  // parameters are taken and will be changed according to each request method
  return await fetch(url, {
    method: methods,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      token: `${token}`,
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
}
