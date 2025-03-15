const host = import.meta.env.VITE_API_HOST_URL || "http://localhost:3000";
export const CONSTANTS = {
  url: {
    host: host,
    create: `${host}/api/v1/urls/shorten/create`,
  },
  messages: {
    uploadFileSuccesfullyTitle: "File uploaded succesfully",
    errorUploadingFileTitle: "Error uploading file",
    errorUploadingFileContent:
      "Uploading the file was not possible. Please check the file settings and try again.",
    errorLoadingFileTitle: "Error on create short url",
    errorLoadingFileContent: "Verify if the url is correct and try again.",
  },
  settings: {
    csvType: "text/csv",
  },
};
