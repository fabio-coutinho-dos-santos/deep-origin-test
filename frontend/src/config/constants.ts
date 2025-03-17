const host = import.meta.env.VITE_API_HOST_URL || "http://localhost:3000";
export const CONSTANTS = {
  url: {
    host: host,
    create: `${host}/api/v1/urls/shortened/create`,
    getAllUrls: `${host}/api/v1/urls/all`,
  },
  messages: {
    uploadFileSuccesfullyTitle: "File uploaded succesfully",
    errorUploadingFileTitle: "Error uploading file",
    errorUploadingFileContent:
      "Uploading the file was not possible. Please check the file settings and try again.",
    errorOnCreate: "Error on create short url",
    errorMessageOnCreate: "Verify if the url is correct and try again.",
    errorOnGetAllUrls: "Error on get all urls",
  },
  settings: {
    csvType: "text/csv",
  },
  storageKeys: {
    accessToken: "accessToken",
    userId: "userId",
    userName: "userName",
  },
};
