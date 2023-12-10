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
  
    return fetch(server + "session/refresh", {
      method: "GET",
      headers: headers
    });
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
    const headers = new Headers();
    headers.set('Authorization', 'Bearer ' + token);
  
    return fetch(server + "events/filter?" + params, {
      method: "GET",
      headers: headers
    });
};

export const fetchAllEventTypes = (token) => {
  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + token);

  return fetch(server + "types", {
    method: "GET",
    headers: headers
  });
};

export function createEvent(event, token) {
  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + token);
  headers.set("Content-Type", "application/json");

  return fetch(server + "events", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(event),
  });
}

export function updateEvent(event, token) {
  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + token);
  headers.set("Content-Type", "application/json");

  return fetch(server + "events", {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(event),
  });
}

export function deleteEvent(id, token) {
  const headers = new Headers();
  headers.set('Authorization', 'Bearer ' + token);

  return fetch(server + "events/" + id, {
    method: "DELETE",
    headers: headers,
  });
}