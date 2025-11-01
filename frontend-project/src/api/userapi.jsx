import axiosclient from "./api";

const authApi = {
  signup: (data) => axiosclient.post("/users/register", data),
  login: (data) => axiosclient.post("/users/login", data),
  getcurrentuser: () => axiosclient.get("/users/getcurrent-user"),
  logout: () => axiosclient.post("/users/logout"),
};

export default authApi;