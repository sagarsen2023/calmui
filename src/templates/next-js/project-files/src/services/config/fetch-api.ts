import { APIOptions, mediaRequest, request } from "./request";

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
};

export default fetchAPI;
