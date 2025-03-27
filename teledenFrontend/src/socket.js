import io from "socket.io-client";
// SOCKET CONFIG
export const createSocketConnection = ({ token }) => {
  const socket = io(process.env.REACT_APP_API_BASE_URL, {
    query: { token },
    transports: ["websocket"],
    secure: true,
  });
  return socket;
};
