import { Buffer } from "buffer";

const server = new URL(import.meta.env.VITE_SERVER_HOST);

export const fetchToken = (username, password) => {
    const headers = new Headers();
    const auth = Buffer.from(username + ':' + password).toString('base64');
    headers.set('Authorization', 'Basic ' + auth);
  
    return fetch(server + "session", {
      method: "GET",
      headers: headers
    });
};

export const refreshToken = (token) => {
    const headers = new Headers();
    headers.set('Authorization', 'Bearer ' + token);
  
    fetch(server + "session/refresh", {
      method: "GET",
      headers: headers
    })
    .then(res => res.text())
    .then((response) => {
      localStorage.setItem("token", response);
    })
    .catch((error) => {
      localStorage.clear();
      console.error("Error fetching data:", error);
    });;
};

export const register = (user) => {
    return fetch(server + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
    });
};

export const fetchEvents = (params, token) => {
  refreshToken(token);
  const newToken = localStorage.getItem("token");

  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + newToken);

  return fetch(server + "events/filter?" + params, {
    method: "GET",
    headers: headers
  });
};

export const fetchEventTypes = (token) => {
  refreshToken(token);
  const newToken = localStorage.getItem("token");
  
  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + newToken);

  return fetch(server + "types", {
    method: "GET",
    headers: headers
  });
};

export function createEvent(event, token) {
  refreshToken(token);
  const newToken = localStorage.getItem("token");
  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + newToken);
  headers.set("Content-Type", "application/json");

  return fetch(server + "events", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(event),
  });
};

export function updateEvent(event, token) {
  refreshToken(token);
  const newToken = localStorage.getItem("token");

  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + newToken);
  headers.set("Content-Type", "application/json");

  return fetch(server + "events", {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(event),
  });
};

export function deleteEvent(id, token) {
  refreshToken(token);
  const newToken = localStorage.getItem("token");
  
  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + newToken);

  return fetch(server + "events/" + id, {
    method: "DELETE",
    headers: headers,
  });
};

export function fetchEventsByUser(token) {
  refreshToken(token);
  const newToken = localStorage.getItem("token");
  
  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + newToken);

  return fetch(server + "events/created", {
    method: "GET",
    headers: headers
  });
};

export function fetchAllUsers(token) {
  refreshToken(token);
  const newToken = localStorage.getItem("token");
  
  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + newToken);

  return fetch(server + "admin/users", {
    method: "GET",
    headers: headers
  });
};

export function deleteUser(id, token) {
  refreshToken(token);
  const newToken = localStorage.getItem("token");
  
  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + newToken);

  return fetch(server + "admin/" + id, {
    method: "DELETE",
    headers: headers,
  });
};