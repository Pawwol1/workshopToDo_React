import {API_KEY, API_URL} from "./constants";

export const getOperations = (id, successCallback) => {
  fetch(`${API_URL}/tasks/${id}/operations`, {
    headers: {
      "Authorization": API_KEY
    }
  })
    .then(r => r.json())
    .then(data => {
      if (data.error === false && typeof successCallback === "function") {
        successCallback(data.data);
      }
    })
    .catch(err => console.log(err));
};

export const createOperation = (id, operation, successCallback) => {
  fetch(`${API_URL}/tasks/${id}/operations`, {
    headers: {
      "Authorization": API_KEY,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(operation)
  })
    .then(r => r.json())
    .then(data => {
      if (data.error === false && typeof successCallback === "function") {
        successCallback(data.data);
      }
    })
    .catch(err => console.log(err));
};

export const updateOperation = (id, operation, successCallback) => {
  fetch(`${API_URL}/operations/${id}`, {
    headers: {
      "Authorization": API_KEY,
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(operation)
  })
    .then(r => r.json())
    .then(data => {
      if (data.error === false && typeof successCallback === "function") {
        successCallback(data.data);
      }
    })
    .catch(err => console.log(err));
};

export const removeOperation = (id, successCallback) => {
  fetch(`${API_URL}/operations/${id}`, {
    headers: {
      "Authorization": API_KEY
    },
    method: "DELETE"
  })
    .then(r => r.json())
    .then(data => {
      if (data.error === false && typeof successCallback === "function") {
        successCallback();
      }
    })
    .catch(err => console.log(err));
};