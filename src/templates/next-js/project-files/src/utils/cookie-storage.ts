"use server";

import { cookies } from "next/headers";

const TOKEN_KEY = "auth_token";

export const getCookie = async (key: string) => {
  return (await cookies()).get(key)?.value;
};

export const setAuthToken = async (token: string) => {
  try {
    const status = (await cookies()).set(TOKEN_KEY, token);
    if (status) return;
    throw new Error("Failed to set token");
  } catch {
    throw new Error("Failed to set token");
  }
};

export const getAuthToken = async () => {
  return await getCookie(TOKEN_KEY);
};

export const removeAuthToken = async () => {
  try {
    const status = (await cookies()).delete(TOKEN_KEY);
    if (status) return;
    throw new Error("Failed to remove token");
  } catch {
    throw new Error("Failed to remove token");
  }
};
