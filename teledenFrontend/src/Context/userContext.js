import jwtDecode from "jwt-decode";
import * as React from "react";
import { useQuery } from "react-query";
import { getPatientProfile } from "../Patient/apis/patientV1";
import { getDentistProfile } from "../Dentist/apis/dentistV1";
import { getImage, getPaymentInfo } from "../Commons/apis/commonV1";

const UserContext = React.createContext();

export function UserProvider({ children }) {
  const [token, setToken] = React.useState(
    window?.localStorage?.getItem("token")
  );
  let defaultUser = null;
  if (token) {
    defaultUser = jwtDecode(token);
  }

  const [user, setUser] = React.useState(defaultUser);

  const { data, refetch, status } = useQuery(
    ["profile", user?._id],
    async () => {
      const getUserProfile =
        user.model === "patients" ? getPatientProfile : getDentistProfile;
      const res = await getUserProfile();
      setUser({
        ...user,
        ...res.data,
        name: res.data.firstName + " " + res.data.lastName,
      });
      return res.data;
    },
    { enabled: false, staleTime: Infinity }
  );

  React.useEffect(() => {
    if (token) {
      try {
        let decoded = jwtDecode(token);
        if (Date.now() >= decoded.exp * 1000) {
          throw Error("token expired");
        }
        setUser(decoded);
        // To get token data
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        window.location.reload();
      }
    }
  }, [token, refetch]);

  React.useEffect(() => {
    // To fetch user data manually only when the token has been verified locally

    // It is wrapped in an if clause to avoid creating an infinite loop
    if (user && status === "idle") {
      refetch();
    }
  }, [user]);

  // TO GET PROFILE PICTURE
  const { data: profilePhoto, refetch: refetchProfilePhoto } = useQuery(
    ["profile-image", user?._id],
    async () => {
      const res = await getImage({ key: data?.profilePhoto });
      return res.data;
    },
    {
      enabled: Boolean(data?.profilePhoto),
      staleTime: Infinity,
      refetchInterval: 3500000,
    }
  );

  const {
    data: paymentInfo,
    refetch: refetchPaymentInfo,
    status: paymentInfoStatus,
  } = useQuery(
    "payment-details",
    async () => {
      const res = await getPaymentInfo();
      window.localStorage.setItem(
        "charges",
        res?.data?.chargesEnabled ?? false
      );
      return res.data;
    },
    {
      enabled: Boolean(user?._id),
    }
  );

  return (
    <UserContext.Provider
      value={{
        user,
        profilePhoto,
        refetchProfilePhoto,
        token,
        setToken,
        refetch,
        status,
        paymentInfo: paymentInfo ?? {
          chargesEnabled:
            window.localStorage.getItem("charges") === "true" ? true : false,
        },
        refetchPaymentInfo,
        paymentInfoStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = React.useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext can only be used inside UserProvider");
  }
  return context;
}
