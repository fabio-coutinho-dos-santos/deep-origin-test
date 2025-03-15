import httpStatus from "http-status";
const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTc0MjA3MTgzNywiZXhwIjoxNzQyMTU4MjM3fQ.ab8GooROlay2_D7xllPgC6E8TTFbkZrip8_OBh903UY";

const jwtToken2 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0MjA3MjEwMSwiZXhwIjoxNzQyMTU4NTAxfQ.K9RwfZLHUk9EDh1l2WX-_QF73LoFYoQNrxaoWX6qISU";
export const useHttp = () => {
  const get = async (url: string) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${jwtToken}`,
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
        Authorization: `Bearer ${jwtToken}`,
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
