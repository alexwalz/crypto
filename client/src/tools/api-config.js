let backendHost;
// const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendHost = 'http://localhost:5000';
} else {
  backendHost = 'https://New-Website.herokuapp.com/';
}

export const API_URL = `${backendHost}`;