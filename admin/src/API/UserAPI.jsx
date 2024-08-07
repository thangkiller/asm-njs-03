import axiosClient from "./axiosClient";

const UserAPI = {
   getAllData: () => {
      const url = "/users";
      return axiosClient.get(url);
   },

   getDetailData: (id) => {
      const url = `/users/${id}`;
      return axiosClient.get(url);
   },

   postSignUp: (data) => {
      const url = `/signup`;
      return axiosClient.post(url, data);
   },
};

export default UserAPI;
