import httpStatus from "http-status";
import { useLocalStorage } from "./useLocalStorage";
import { CONSTANTS } from "../config/constants";
const { getItem } = useLocalStorage();
export const useHttp = () => {
  const get = async (url: string) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getItem(CONSTANTS.storageKeys.accessToken)}`,
      },
    };

    const response = await fetch(url, options);
    return await inspectResponse(response);
  };

  const post = async (url: string, body: Record<string, unknown>) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getItem(CONSTANTS.storageKeys.accessToken)}`,
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, options);
    return await inspectResponse(response);
  };

  const inspectResponse = async (response: any) => {
    const statusCode = response.status;
    if (statusCode === httpStatus.OK || statusCode === httpStatus.CREATED) {
      const result = await response.json();
      return Promise.resolve(result);
    } else {
      return Promise.reject(response);
    }
  };

  return {
    get,
    post,
  };
};
