import React, { useState, useEffect } from "react";
import PatientSignUpModal from "../Auth/PatientSignUpModal";
import DentistSignUpModal from "../Auth/DentistSignUpModal";
import SignInModal from "../Auth/SignInModal";
import VerificationCodeModal from "../Auth/VerificationCodeModal";
import { useUserContext } from "../Context/userContext";
import { useHistory, useLocation } from "react-router";
import { Dropdown, Menu, Row } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import SignUpSuccessModal from "../Dentist/SignUpSuccessModal";
import queryString from "query-string";
// import logo from "../assets/img/logo-new.webp";
import logoOld from "../assets/img/NewLogo.webp";
import { Link } from "react-router-dom";
// import logoNew from "../assets/img/logo-new.webp";

function Header({ cssClass }) {
  const history = useHistory();
  let location = useLocation();
  let { pathname } = location;
  let query = queryString.parse(location.search);
  const [isSignUpModalVisible, setIsSignUpModalVisible] = React.useState("");
  const [isSignInModalVisible, setIsSignInModalVisible] = React.useState(false);
  const [isVerificationModalVisible, setIsVerificationModalVisible] =
    React.useState(false);
  const [isSignUpSuccessModalVisible, setIsSignUpSuccessModalVisible] =
    React.useState(query.notApproved ? true : false);
  const [entity, setEntity] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("");
  const { user, profilePhoto, paymentInfo } = useUserContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  React.useEffect(() => {
    if (pathname) {
      if (pathname === "/") {
        setActiveTab("Home");
        return;
      }
      let urlArray = pathname.split("/");
      let strArr = urlArray[urlArray.length - 1].split("-");
      let activeTab = [];
      for (let i in strArr) {
        activeTab[i] =
          strArr[i]?.charAt(0)?.toUpperCase() + strArr[i]?.slice(1);
      }
      console.log("tab is ", activeTab.join(""));
      setActiveTab(activeTab.join(" "));
    }
  }, [pathname]);

  const logOut = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("charges");
    window.location.reload();
  };

  const isPatient = user?.model === "patients";
  const isDentistActivated =
    user?.model === "dentists" && paymentInfo?.chargesEnabled;
  const dentistNotActivated =
    user?.model === "dentists" && !paymentInfo?.chargesEnabled;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menu = (
    <Menu>
      <Menu.Item className="cursor-pointer" onClick={logOut} key="1">
        <label className="cursor-pointer">Logout</label>
      </Menu.Item>
    </Menu>
  );

  const commonProtectedRoutes = (
    <>
      <span className="brix---header-nav-list-item-2">
        <Link
          name="patient"
          className={`brix---header-nav-link-white w-nav-link ${
            activeTab === "Profile" && "active selected"
          }`}
          to={`/${user?.model}/profile`}
        >
          Profile
        </Link>
      </span>
      <span className="brix---header-nav-list-item-2">
        <Link
          className={`brix---header-nav-link-white w-nav-link ${
            activeTab === "Messages" && "active selected"
          }`}
          name="dentist"
          to={`/${user?.model}/messages`}
        >
          Messages
        </Link>
      </span>
    </>
  );
  const patientRoutes = (
    <>
      <span className="brix---header-nav-list-item-2">
        <Link
          className={`brix---header-nav-link-white w-nav-link ${
            activeTab === "Create Request" && "active selected"
          }`}
          to={`/${user?.model}/create-request`}
        >
          Create New Request
        </Link>
      </span>
      <span className="brix---header-nav-list-item-2">
        <Link
          className={`brix---header-nav-link-white w-nav-link   ${
            activeTab === "Dashboard" && "active selected"
          }`}
          type="dashed"
          to={`/${user?.model}/dashboard`}
        >
          Dashboard
        </Link>
      </span>
    </>
  );
  const dentistRoutes = (
    <>
      <span className="brix---header-nav-list-item-2">
        <Link
          className={`brix---header-nav-link-white w-nav-link ${
            activeTab === "Unapprovedappointments" && "active selected"
          }`}
          to={`/${user?.model}/unapprovedappointments`}
        >
          Appointments
        </Link>
      </span>
    </>
  );

  const mobileNav = () => {
    setIsOpen(!isOpen);
  };
  const oldNav = () => {
    return (
      <div
        data-w-id="00c53332-ec67-7c3e-e466-78cdbcb37a21"
        data-animation="default"
        data-collapse="medium"
        data-duration="400"
        data-easing="ease"
        data-easing2="ease"
        role="banner"
        className={`w-nav py-3 nav-header-wrapper-transparent ${
          isScrolled ? "scrolled" : ""
        } ${cssClass}`}
      >
        <div className="nav-container nav w-container">
          <div className="nav-content-wrapper-2" id="navbarNavAltMarkup">
            <Link to="/" className="nav---header-logo6-link-2 w-nav-brand">
              <img
                className="brix---header-logo-2"
                // src={isScrolled ? logoOld : logoNew}
                src={logoOld}
                alt="TeleDental"
                onClick={() => !dentistNotActivated && history.push("/")}
              />
            </Link>
            <div
              className="nav---header-right-col-2"
              style={{
                display: location.pathname.includes("verification-success")
                  ? "none"
                  : "",
              }}
            >
              <div className={isOpen ? "mobile-nav-show" : "mobile-nav-hide"}>
                <nav
                  role="navigation"
                  className={`nav-menu-wrapper-white w-nav-menu ${
                    isOpen && "mobile-nav"
                  }`}
                >
                  <div
                    className={`d-flex ${
                      isOpen ? "mobile-navbar-open" : "align-items-center"
                    }`}
                  >
                    {!dentistNotActivated && (
                      <>
                        <div
                          className={`brix---header-nav-list-item-2 mb-0 px-0 ${
                            activeTab === "Home" && "active"
                          }`}
                          // onClick={() => history.push("/")}
                        >
                          <Link
                            to="/"
                            name="home"
                            className={`brix---header-nav-link-white w-nav-link ${
                              activeTab === "Home" && "selected"
                            }`}
                            // onClick={() => setIsSignUpModalVisible("patient")}
                          >
                            Home
                          </Link>
                        </div>
                      </>
                    )}
                    {user ? (
                      <>
                        {isPatient ? (
                          <>
                            {commonProtectedRoutes}
                            {patientRoutes}
                          </>
                        ) : isDentistActivated ? (
                          <>
                            {commonProtectedRoutes}
                            {dentistRoutes}
                          </>
                        ) : !dentistNotActivated ? (
                          <>{commonProtectedRoutes}</>
                        ) : null}

                        <Row className="d-flex justify-content-start navUserCard">
                          <div className="d-flex flex-row">
                            <Avatar
                              style={{
                                width: "30px",
                                marginLeft: "15px",
                                height: "30px",
                              }}
                              className="header-avatar shadow-sm hover capitalize"
                              src={profilePhoto}
                            >
                              <span className="capitalize">
                                {user?.name?.[0]}
                              </span>
                            </Avatar>

                            <Dropdown overlay={menu} trigger={["click"]}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginLeft: "6px",
                                }}
                              >
                                <div
                                  style={{ marginBottom: "0" }}
                                  className="d-flex align-items-center"
                                >
                                  <span
                                    className={`capitalize ${
                                      isPatient ? `d-lg-none d-xl-flex ` : ``
                                    } mr-2`}
                                  >
                                    {" "}
                                    {user?.name}
                                  </span>{" "}
                                  <DownOutlined
                                    style={{ fontSize: "smaller" }}
                                  />
                                </div>
                              </div>
                            </Dropdown>
                          </div>
                        </Row>
                      </>
                    ) : (
                      <ul role="list" className="brix---header-nav-menu-list-2">
                        {/* <li className="brix---header-nav-list-item-2">
													<Link
														to="/how-it-works"
														name="patient"
														className={`brix---header-nav-link-white w-nav-link ${
															activeTab === "How It Works" && "active selected"
														}`}
														// onClick={() => setIsSignUpModalVisible("patient")}
													>
														How it works
													</Link>
												</li> */}

                        <li className="brix---header-nav-list-item-2">
                          <Link
                            to="/contact-us"
                            name="contact"
                            className={`brix---header-nav-link-white w-nav-link ${
                              activeTab === "Contact" && "active selected"
                            }`}
                          >
                            Contact
                          </Link>
                        </li>

                        <li className="brix---header-nav-list-item-2">
                          <Link
                            to="/join-us"
                            name="patient"
                            className={`brix---header-nav-link-white w-nav-link ${
                              activeTab === "JoinUs" && "active selected"
                            }`}
                            // onClick={() => setIsSignUpModalVisible("patient")}
                          >
                            Join Us
                          </Link>
                        </li>
                        <li className="brix---header-nav-list-item-2">
                          <Link
                            to="/auth"
                            name="login"
                            className={`brix---header-nav-link-white w-nav-link ${
                              activeTab === "Login" && "active selected"
                            }`}
                            // onClick={() => setIsSignUpModalVisible("patient")}
                          >
                            Log in
                          </Link>
                        </li>

                        <li className="brix---header-nav-list-item-2">
                          <Link to={'/book-appointment'} className="btn w-nav-link btn_blue">
                            Book Appointment
                          </Link>
                        </li>
                        {/* <li class="brix---header-nav-list-item-2 dropdown">
                          <span
                            className={`brix---header-nav-link-white w-nav-link ${
                              activeTab === "Patient Signup" ||
                              activeTab === "Dentist Signup"
                                ? "active selected"
                                : ""
                            }`}
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Sign Up
                            <DownOutlined style={{ fontSize: "smaller" }} />
                          </span>

                          <div
                            class="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                          >
                            <Link
                              to="/patient-signup"
                              name="patient"
                              className={`dropdown-item`}
                              // onClick={() => setIsSignUpModalVisible("patient")}
                            >
                              Patient sign up
                            </Link>
                            <Link
                              to="/dentist-signup"
                              name="dentist"
                              className={`dropdown-item`}
                              // onClick={() => setIsSignUpModalVisible("patient")}
                            >
                              Dentist sign up
                            </Link>
                          </div>
                        </li> */}

                        {/* <li className="brix---header-nav-list-item-2">
                          <Link
                            name="dentist"
                            to="/dentist-signup"
                            className={`  w-nav-link btn_pink`}
                          >
                            Sign Up
                          </Link>
                        </li> */}
                        {/* <li className="brix---header-nav-list-item-2">
                          <button
                            className="w-nav-link btn_blue"
                            onClick={() => setIsSignInModalVisible(true)}
                          >
                            Sign in
                          </button>
                        </li> */}
                      </ul>
                    )}
                  </div>
                </nav>
              </div>
              <div
                className={`hamburger-menu-wrapper-2 w-nav-button ${
                  isOpen ? "w--open" : ""
                }`}
                onClick={mobileNav}
              >
                <div
                  className={`brix---hamburger-menu-bar-top-white ${
                    isOpen ? "crossTop" : ""
                  }`}
                ></div>
                <div
                  className={`brix---hamburger-menu-bar-bottom-white ${
                    isOpen ? "crossBottom" : ""
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="primaryHeader">
      {oldNav()}

      <PatientSignUpModal
        isModalVisible={isSignUpModalVisible === "patient"}
        setIsModalVisible={setIsSignUpModalVisible}
        setIsVerificationModalVisible={setIsVerificationModalVisible}
        setEntity={setEntity}
      />
      <DentistSignUpModal
        isModalVisible={isSignUpModalVisible === "dentist"}
        setIsModalVisible={setIsSignUpModalVisible}
        setIsVerificationModalVisible={setIsVerificationModalVisible}
        setEntity={setEntity}
        setIsSignUpSuccessModalVisible={setIsSignUpSuccessModalVisible}
      />
      <SignInModal
        isModalVisible={isSignInModalVisible}
        setIsModalVisible={setIsSignInModalVisible}
        setIsVerificationModalVisible={setIsVerificationModalVisible}
        setEntity={setEntity}
      />
      <VerificationCodeModal
        isModalVisible={isVerificationModalVisible}
        setIsModalVisible={setIsVerificationModalVisible}
        entity={entity}
      />
      <SignUpSuccessModal
        isModalVisible={isSignUpSuccessModalVisible}
        setIsModalVisible={setIsSignUpSuccessModalVisible}
      />
    </header>
  );
}

export default Header;
