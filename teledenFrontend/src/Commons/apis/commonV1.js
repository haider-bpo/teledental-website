import qs from "query-string";
import client from "../../axios-configured";

export const getImage = async (queryParam = {}) => {
  if (Object.keys(queryParam).length !== 0) {
    queryParam = qs.stringify(queryParam);
    return client.get(`/api/v1/users/image?${queryParam}`);
  }
};

export const getChatThread = async ({ id, queryParam = {} }) => {
  if (Object.keys(queryParam).length !== 0) {
    queryParam = qs.stringify(queryParam);
    return client.get(`/api/v1/chats/${id}?${queryParam}`);
  }
  return client.get(`/api/v1/chats/${id}`);
};

export const getRequests = async ({ queryParam = {} }) => {
  if (Object.keys(queryParam).length !== 0) {
    queryParam = qs.stringify(queryParam);
    return client.get(`/api/v1/requests?${queryParam}`);
  }
  return client.get(`/api/v1/requests`);
};

export const getRequestStats = async () => {
  return client.get(`/api/v1/requests/stats/patient`);
};

export const acceptRequest = async ({ id }) => {
  return client.patch(`/api/v1/requests/accept/${id}`);
};

export const rejectRequest = async ({ id }) => {
  return client.patch(`/api/v1/requests/reject/${id}`);
};

export const saveDevice = async (payload) => {
  return client.post(`/api/v1/fcm/register`, payload.body);
};

export const getAdminProfile = async () => {
  return client.get(`/api/v1/adminProfile`);
};

export const getRequestStatsForAdmin = async ({ id }) => {
  if (id != undefined) {
    return client.get(`/api/v1/requests/stats/admin/${id}`);
  }
};

export const getMeetingLink = async ({ id }) => {
  return client.get(`/api/v1/requests/${id}/meeting`);
};

export const uploadAttachment = async ({ id, formData }) => {
  return client.post(`/api/v1/chats/${id}`, formData);
};

export const createSession = async ({ payload }) => {
  return client.post(`/api/v1/sessions/create`, payload);
};

export const getPaymentInfo = async () => {
  return client.get("/api/v1/stripe/details");
};

export const getTransactions = async () => {
  return client.get("/api/v1/stripe/transactions");
};

export const confirmVerifiedAccount = async (email) => {
  return client.get(`/api/v1/public/verifyemails?email=${email}`);
};

export const verifyEmail = async (email) => {
  return client.get(`/api/v1/public/verifyemails?email=${email}`);
}

export const getSubscription = async (id, model) => {
  return client.get(`/api/v1/public/getsubscription?id=${id}&model=${model}`);
}

export const addSubscription = async (body) => {
  return client.post("/api/v1/public/addsubscription", body);
};

export const updateSubscription = async (body) => {
  return client.post("/api/v1/public/updatesubscription", body);
};

export const SendEmailToReceiverAPI = async (formData) => {
  return client.post(`/api/v1/public/sendEmailToReceiverApicall`, formData);
};
