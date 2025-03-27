import client from "../../axios-configured";

// Profile

export const getPatientProfile = async () => {
  return client.get("/api/v1/patients");
};
export const updateProfile = async (payload) => {
  return client.patch("/api/v1/patients", payload.body);
};

// Requests

export const createRequest = async (payload) => {
  return client.post(`/api/v1/requests`, payload.body);
};
export const getRequestById = async (payload) => {
  return client.get(`/api/v1/requests/${payload.id}`);
};
export const updateRequest = async (payload) => {
  return client.patch(`/api/v1/requests/${payload.id}`, payload.body);
};
export const deleteRequest = async (payload) => {
  return client.delete(`/api/v1/requests/${payload.id}`);
};

export const setupIntent = async () => {
  return client.post("/api/v1/stripe/setup-intent");
};
export const videoConsult = async (chatId) => {
  return client.post("/api/v1/stripe/video-consult", {requestId: `${chatId}`});
};

export const getPlans = async () => {
  return client.get("/api/v1/stripe/plans");
};

export const requestConsultation = async ({ body }) => {
  return client.post("/api/v1/sessions/request-consultation", body);
};

export const addAppointment = async (body) => {
  return client.post("/api/v1/patients/auth/addappointment", body);
};

export const addmedicalHistory = async (body) => {
  return client.post("/api/v1/patients/auth/addmedicalHistory", body);
};

export const getMedicalHistory = async (id) => {
  return client.get(`/api/v1/patients/auth/checkMedicalHistoryAdded?userId=${id}`);
}

export const getAppointments = async (id) => {
  return client.get(`/api/v1/patients/auth/getappointments?userId=${id}`);
}

export const appointmentDetails = async (id) => {
  return client.get(`/api/v1/patients/auth/appointmentDetails?appointmentId=${id}`);
}

export const getPatient = async (id) => {
  return client.get(`/api/v1/patients/auth/getpatient?userId=${id}`);
}
