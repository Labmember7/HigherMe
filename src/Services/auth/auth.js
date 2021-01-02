import axios from "axios";

export function sendToken(credentials) {
  return new Promise((res, rej) => {
    axios({
      url: "/auth/send-token",
      method: "post",
      data: credentials,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImxrTnhBdk4xREF2Yk96SGpHX0F5cCJ9.eyJpc3MiOiJodHRwczovL2Rldi1rbHMxcnFway51cy5hdXRoMC5jb20vIiwic3ViIjoicnFDMDd5azB6a2FJZklrWGNjMDFQazF0dDJnb3FFdDFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZmlyc3RhcGkvYXBpIiwiaWF0IjoxNjAwNDMxNzQ3LCJleHAiOjE2MDMwMjM3NDcsImF6cCI6InJxQzA3eWswemthSWZJa1hjYzAxUGsxdHQyZ29xRXQxIiwic2NvcGUiOiJyZWFkOm1lc3NhZ2VzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.pzWQWiorAXWsjRn8yVPrSJ8BJC93Od2DjlT3qz3_vsbRTZ7CbVGhU4OwGRfnUKFskT97Di7r_MKflBG-f-623LG9VygmOeFrqvE59JmDYscTJ7V5K2GKvBFF_55F0YsDRvGIxWHGgaSPYqygsnhQVrQvVFThmFsTm2r0yvwwAR4K-4lIZ6BqIS8NFJqUyeaFpvyOPgpKb7Xovoej3gtgrsFxrHfdq4GyE9Y1gQOxPWrX0xmNi9Z-EAEbk0WZ4TOFrfk8EA-K6e5gEx0TrvCbFQyFQofint7JlnF1czaMmdJiFW-MxVpp3AWDkSgDdl_6eblUmMxMqIbJNTIQXo5sgg"
      }
    })
      .then(response => {
        res(response);
      })
      .catch(error => {
        rej(error);
      });
  });
}
export function validateToken(credentials) {
  return new Promise((res, rej) => {
    axios({
      url: "/auth/validate-token",
      method: "post",
      data: credentials,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImxrTnhBdk4xREF2Yk96SGpHX0F5cCJ9.eyJpc3MiOiJodHRwczovL2Rldi1rbHMxcnFway51cy5hdXRoMC5jb20vIiwic3ViIjoicnFDMDd5azB6a2FJZklrWGNjMDFQazF0dDJnb3FFdDFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZmlyc3RhcGkvYXBpIiwiaWF0IjoxNjAwNDMxNzQ3LCJleHAiOjE2MDMwMjM3NDcsImF6cCI6InJxQzA3eWswemthSWZJa1hjYzAxUGsxdHQyZ29xRXQxIiwic2NvcGUiOiJyZWFkOm1lc3NhZ2VzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.pzWQWiorAXWsjRn8yVPrSJ8BJC93Od2DjlT3qz3_vsbRTZ7CbVGhU4OwGRfnUKFskT97Di7r_MKflBG-f-623LG9VygmOeFrqvE59JmDYscTJ7V5K2GKvBFF_55F0YsDRvGIxWHGgaSPYqygsnhQVrQvVFThmFsTm2r0yvwwAR4K-4lIZ6BqIS8NFJqUyeaFpvyOPgpKb7Xovoej3gtgrsFxrHfdq4GyE9Y1gQOxPWrX0xmNi9Z-EAEbk0WZ4TOFrfk8EA-K6e5gEx0TrvCbFQyFQofint7JlnF1czaMmdJiFW-MxVpp3AWDkSgDdl_6eblUmMxMqIbJNTIQXo5sgg"
      }
    })
      .then(response => {
        res(response);
      })
      .catch(error => {
        rej(error);
      });
  });
}
export function resetPassword(credentials) {
  return new Promise((res, rej) => {
    axios({
      url: "/auth/reset-password",
      method: "post",
      data: credentials,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImxrTnhBdk4xREF2Yk96SGpHX0F5cCJ9.eyJpc3MiOiJodHRwczovL2Rldi1rbHMxcnFway51cy5hdXRoMC5jb20vIiwic3ViIjoicnFDMDd5azB6a2FJZklrWGNjMDFQazF0dDJnb3FFdDFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZmlyc3RhcGkvYXBpIiwiaWF0IjoxNjAwNDMxNzQ3LCJleHAiOjE2MDMwMjM3NDcsImF6cCI6InJxQzA3eWswemthSWZJa1hjYzAxUGsxdHQyZ29xRXQxIiwic2NvcGUiOiJyZWFkOm1lc3NhZ2VzIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.pzWQWiorAXWsjRn8yVPrSJ8BJC93Od2DjlT3qz3_vsbRTZ7CbVGhU4OwGRfnUKFskT97Di7r_MKflBG-f-623LG9VygmOeFrqvE59JmDYscTJ7V5K2GKvBFF_55F0YsDRvGIxWHGgaSPYqygsnhQVrQvVFThmFsTm2r0yvwwAR4K-4lIZ6BqIS8NFJqUyeaFpvyOPgpKb7Xovoej3gtgrsFxrHfdq4GyE9Y1gQOxPWrX0xmNi9Z-EAEbk0WZ4TOFrfk8EA-K6e5gEx0TrvCbFQyFQofint7JlnF1czaMmdJiFW-MxVpp3AWDkSgDdl_6eblUmMxMqIbJNTIQXo5sgg"
      }
    })
      .then(response => {
        res(response);
      })
      .catch(error => {
        rej(error);
      });
  });
}
