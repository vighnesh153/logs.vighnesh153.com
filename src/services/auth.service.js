import Cookie from 'js-cookie';
import qs from "qs";

import { AUTH_URL, CLIENT_URL } from '../constants';

export const isLoggedIn = () => {
  const user = Cookie.get('user');
  return !!user;
};

export const isAdmin = () => {
  const user = JSON.parse(Cookie.get('user') || {});
  const userRoles = user.roles || [];
  return userRoles.includes('admin');
};

const getPostAuthRedirectUrl = (params) => {
  const queryParams = qs.stringify({...params, loginSuccess: true})
  console.log(queryParams);
  return encodeURIComponent(CLIENT_URL + '?' + queryParams);
};

export const getAuthUrl = (params) => {
  const redirectTo = getPostAuthRedirectUrl(params);
  return `${AUTH_URL}?redirectTo=${redirectTo}`;
};

export const loginSuccess = () => {
  return window.location.search.includes('loginSuccess');
};
