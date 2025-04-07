import client from "../../axios-configured";

export const signup = async (payload) => {
  return client.post(`/api/v1/${payload.entity}/auth/signup`, payload.body);
};

export const login = async (payload) => {
  return client.post(`/api/v1/${payload.entity}/auth/login`, payload.body);
};

export const contactUs = async (payload) => {
  return client.post(`/api/v1/contact_us`, payload.body);
};
export const forgotPassword = async (payload) => {
  return client.post(
    `/api/v1/${payload.entity}/auth/forgot-password`,
    payload.body
  );
};
export const resetPassword = async (payload) => {
  console.log("payload", payload.entity);
  return client.patch(
    `/api/v1/${payload.type}/auth/reset-password/${payload.id}`,
    payload.body
  );
};
export const verifyCode = async (payload) => {
  return client.post(
    `/api/v1/${payload.entity}/auth/verify-code/${payload.userId}`,
    payload.body
  );
};
