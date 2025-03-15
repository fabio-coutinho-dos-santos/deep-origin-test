import httpStatus from "http-status";

export const useHttp = () => {
  const get = async (url: string) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    const response = await fetch(url, options);
    return await inspectResponse(response);
  };

  const post = async (url: string, body: Record<string, string>) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
