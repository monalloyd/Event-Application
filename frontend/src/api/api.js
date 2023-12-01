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

export const register = (body) => {
    return fetch(server + "register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
    });
};

export const fetchAllEvents = (params, token) => {
    const headers = new Headers();
    headers.set('Authorization', 'Bearer ' + token);
  
    return fetch(server + "events?" + params, {
      method: "GET",
      headers: headers
    });
};