import axiosClient from "./axiosClient";

const CheckoutAPI = {
   postEmail: (query) => {
      const url = `/email`;
      return axiosClient.post(url, query);
   },
};

export default CheckoutAPI;
