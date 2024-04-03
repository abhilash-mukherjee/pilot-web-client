import { atom } from 'recoil';

export const authState = atom({
  key: 'authState', // unique ID (with respect to other atoms/selectors)
  default: {
    isLoggedIn: false,
    token: null,
    userDetails: {}, // Store user details here
  },
});

export const curretSessionDataState = atom({
  key: 'curretSessionDataState', // unique ID (with respect to other atoms/selectors)
  default: null,
});