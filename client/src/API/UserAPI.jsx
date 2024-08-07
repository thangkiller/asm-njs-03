import axiosClient from "./axiosClient";

const UserAPI = {
   getDetailData: (id) => {
      const url = `/users/${id}`;
      return axiosClient.get(url);
   },
   postSignUp: (data) => {
      const url = `/signup`;
      return axiosClient.post(url, data);
   },
   postLogin: (data) => {
      const url = `/login`;
      return axiosClient.post(url, data);
   },
};

export default UserAPI;
