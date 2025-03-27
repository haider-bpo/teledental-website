import jwtDecode from "jwt-decode";
import queryString from "query-string";
import * as React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useUserContext } from "../Context/userContext";

function SocialAuthentication(props) {
  const history = useHistory();
  const location = useLocation();
  const { setToken } = useUserContext();

  let query = queryString.parse(location.search);

  const authGuard = () => {
    if (!query?.token) {
      history.push("/");
    }
    setToken(query?.token);
    window.localStorage.setItem("token", query?.token);
    let decoded = jwtDecode(query?.token);
    if (decoded.model === "dentists") {
      if (!query?.isApproved) history.push("/?notApproved=1");
      if (!query?.chargesEnabled) {
        history.push(`/dentists/identity-verification`);
      } else {
        history.push(`/dentists/profile`);
      }
    } else {
      history.push(`/${decoded.model}/dashboard`);
    }
  };

  React.useLayoutEffect(() => {
    authGuard(); // eslint-disable-next-line
  }, []);
  return <div></div>;
}

export default SocialAuthentication;
