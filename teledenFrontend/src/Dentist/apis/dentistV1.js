import client from "../../axios-configured";

// Profile
export const getDentistProfile = async () => {
  return client.get("/api/v1/dentists");
};

export const getUnApprovedDentists = async (id) => {
  return client.get(`/api/v1/patients/auth/unapproveddentists?userId=${id}`);
};

export const getUnApprovedAppointments = async (id) => {
  return client.get(`/api/v1/patients/auth/unapprovedappointments?userId=${id}`);
}

export const approvedDentist = async (payload) => {
  return client.post("/api/v1/patients/auth/approveddentist", payload);
};

export const updateDentistProfile = async (payload) => {
  return client.patch("/api/v1/dentists", payload.body);
};

export const createAccount = async ({ body }) => {
  return client.post("/api/v1/stripe/create-account", body);
};

export const uploadFile = async ({ body }) => {
  return client.post("/api/v1/stripe/upload-file", body);
};

export const verifyAccount = async ({ body }) => {
  return client.post("/api/v1/stripe/verify-account", body);
};

export const acceptConsultation = async ({ id }) => {
  return client.post(`/api/v1/sessions/${id}/accept-consultation`);
};

export const updateAppointment = async (body) => {
  return client.post("/api/v1/patients/auth/updateappointment", body);
};