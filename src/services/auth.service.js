import Cookie from 'js-cookie';

export const isDev = window.location.href.startsWith('http://localhost');

export const apiUrl = isDev ? 'http://localhost:3001' : 'https://api.vighnesh153.com';
export const clientUrl = isDev ? 'http://localhost:3000' : 'https://logs.vighnesh153.com';
export const authUrl = isDev ? 'http://localhost:3010' : 'https://auth.vighnesh153.com';

export const isLoggedIn = () => {
  const user = Cookie.get('user');
  return !!user;
};

export const isAdmin = () => {
  const user = JSON.parse(Cookie.get('user') || {});
  const userRoles = user.roles || [];
  return userRoles.includes('admin');
};

const getPostAuthRedirectUrl = () => {
  return encodeURIComponent(clientUrl + '?loginSuccess');
};

export const getAuthUrl = () => {
  const redirectTo = getPostAuthRedirectUrl();
  return `${authUrl}?redirectTo=${redirectTo}`;
};

export const loginSuccess = () => {
  return window.location.search.includes('loginSuccess');
};
