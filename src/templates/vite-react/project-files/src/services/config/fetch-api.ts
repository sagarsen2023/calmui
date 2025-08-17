import { BASE_URL } from "./query-urls";
import { deleteAllCookies, getAuthToken } from "@/utils/cookie-storage";

export interface APIOptions extends RequestInit {
  headers?: Record<string, string>;
}

export async function request<T>(
  isNextApi: boolean,
  method: string,
  endpoint: string,
  options: APIOptions = {}
): Promise<T> {
  // Configure your token from here
  // const token = getAuthToken();
  const url = isNextApi ? endpoint : `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    method,
    headers: {
      "Content-Type": "application/json",
      // Authorization: token ? `Bearer ${token}` : "", // Uncomment this line based on your requirements
      "X-Project-Id": "6888b34c12456c8bab0377ac",
      ...options.headers,
    },
  });
  if (response.status === 401) {
    deleteAllCookies();
    // ? Add you redirection logic and other required logics here
  }
  return response.json();
}

export async function mediaRequest<T>(
  method: string,
  endpoint: string,
  body: FormData,
  options: APIOptions = {}
): Promise<T> {
  const token = getAuthToken();
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    method,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "X-Project-Id": "6888b34c12456c8bab0377ac",
      ...options.headers,
    },
    body,
  });

  return response.json();
}

interface GetAndDeleteAPIParams {
  endpoint: string;
  options?: APIOptions;
}

interface PostPutAndPatchAPIParams extends GetAndDeleteAPIParams {
  body: unknown;
}

export interface MediaPostApiParams extends GetAndDeleteAPIParams {
  formData: FormData;
}

const fetchAPI = {
  get: <T>({ endpoint, options = {} }: GetAndDeleteAPIParams) =>
    request<T>(false, "GET", endpoint, options),
  post: <T>({ endpoint, body, options = {} }: PostPutAndPatchAPIParams) =>
    request<T>(false, "POST", endpoint, {
      ...options,
      body: JSON.stringify(body),
    }),
  put: <T>({ endpoint, body, options = {} }: PostPutAndPatchAPIParams) =>
    request<T>(false, "PUT", endpoint, {
      ...options,
      body: JSON.stringify(body),
    }),
  delete: <T>({ endpoint, options = {} }: GetAndDeleteAPIParams) =>
    request<T>(false, "DELETE", endpoint, options),
  patch: <T>({ endpoint, body, options = {} }: PostPutAndPatchAPIParams) =>
    request<T>(false, "PATCH", endpoint, {
      ...options,
      body: JSON.stringify(body),
    }),
  mediaUpload: <T>({ endpoint, formData, options = {} }: MediaPostApiParams) =>
    mediaRequest<T>("POST", endpoint, formData, options),
  postWithUrlEncoded: <T>({
    endpoint,
    body,
    options = {},
  }: PostPutAndPatchAPIParams) =>
    request<T>(false, "POST", endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...options.headers,
      },
      body: new URLSearchParams(body as Record<string, string>).toString(),
    }),
  putWithUrlEncoded: <T>({
    endpoint,
    body,
    options = {},
  }: PostPutAndPatchAPIParams) =>
    request<T>(false, "PUT", endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        ...options.headers,
      },
      body: new URLSearchParams(body as Record<string, string>).toString(),
    }),
};

export default fetchAPI;
