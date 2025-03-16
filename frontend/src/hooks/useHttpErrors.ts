export const useHttpErrors = () => {
  const getErrorMessage = (httpStatus: number) => {
    switch (httpStatus) {
      case 400:
        return "Bad Request";
      case 401:
        return "Unauthorized";
      case 403:
        return "Forbidden";
      case 404:
        return "Not Found";
      case 429:
        return "Too Many Requests, please try again after 1 minute";
      case 500:
        return "Something went wrong";
      default:
        return "Something went wrong";
    }
  };

  const loginErrorHandling = (httpStatus: number) => {
    if (httpStatus == 401) {
      return "Email or password incorrect";
    }
    return "An error occurred, please try again later";
  };

  const registerErrorHandling = (httpStatus: number) => {
    if (httpStatus == 400) {
      return "Invalid data";
    }
    return "An error occurred, please try again later";
  };

  return { getErrorMessage, loginErrorHandling, registerErrorHandling };
};
