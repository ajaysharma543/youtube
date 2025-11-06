import axiosclient from "./api";

const dashbaordApi = {
  dashboardvidoes: () => axiosclient.get("/dashboard/videos"),
  
};

export default dashbaordApi;
