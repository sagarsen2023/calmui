import Cookies from "js-cookie";

const TOKEN_KEY = "AUTH_TOKEN";

export const getAuthToken = () => Cookies.get(TOKEN_KEY);

export const setAuthToken = (token: string) => Cookies.set(TOKEN_KEY, token);

export const deleteAllCookies = () => {
  Cookies.remove(TOKEN_KEY);
};
