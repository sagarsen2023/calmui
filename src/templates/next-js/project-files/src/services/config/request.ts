import { getAuthToken, removeAuthToken } from "@/utils/cookie-storage";
import { redirect } from "next/navigation";
import { BASE_URL } from "./query-urls";

export interface APIOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function request<T>(
  isNextApi: boolean,
  method: string,
  endpoint: string,
  options: APIOptions = {}
): Promise<T> {
  const token = await getAuthToken();
  const url = isNextApi ? endpoint : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  });
  if (response.status === 401) {
    // Handle your refresh token logic here
    await removeAuthToken();
    redirect("/");
  }
  return response.json();
}

export async function mediaRequest<T>(
  method: string,
  endpoint: string,
  body: FormData,
  options: APIOptions = {}
): Promise<T> {
  const token = await getAuthToken();
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
    body,
  });

  return response.json();
}
