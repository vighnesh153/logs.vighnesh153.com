export const IS_DEV = window.location.href.startsWith('http://localhost');

export const API_URL = IS_DEV ? 'http://localhost:3001' : 'https://api.vighnesh153.com';
export const CLIENT_URL = IS_DEV ? 'http://localhost:3000' : 'https://logs.vighnesh153.com';
export const AUTH_URL = IS_DEV ? 'http://localhost:3010' : 'https://auth.vighnesh153.com';
