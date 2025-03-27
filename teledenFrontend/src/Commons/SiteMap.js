import React from "react";
import { useHistory } from "react-router-dom";
import Header from "./Header";
export default function SiteMap() {
  let history = useHistory();

  let array = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Cosmetic Dentistry",
      link: "/cosmetic-teledental-dentistry-teledentistry-treatment-information",
    },
    {
      name: "Dental Emergencies",
      link: "/local-dental-emergencies-teledental-common-dental-problems-consult",
    },
    {
      name: "Gingivitis And Periodental",
      link: "/local-gingivitis-teledental-periodontal-information-periodontist-consult",
    },
    {
      name: "Best Teledental",
      link: "/best-teledental-care-local-teledentist-office-information",
    },
    {
      name: "Dental Crown",
      link: "/local-teledentistry-dental-crown-info-online-teledental-crowns-information",
    },
    {
      name: "Dental Implants",
      link: "/local-teledentistry-dental-implants-question-info-teledental-dental-implant-answers",
    },
    {
      name: "Whitening And Veneers",
      link: "/best-teeth-whitening-question-dentist-teledental-dental-veneers-info",
    },
    {
      name: "Dental Stem Cell",
      link: "/local-teledental-stem-cells-dentistry-care-information",
    },
    {
      name: "Terms And Conditions",
      link: "/terms-and-conditions",
    },
    {
      name: "About Us",
      link: "/best-live-dentist-video-about-us ",
    },
    {
      name: "Privacy Policy",
      link: "/privacy-policy-teledental",
    },
  ];

  return (
    <>
      <Header />
      <div
        style={{
          color: "#000",
          maxWidth: "900px",
          marginLeft: "50px",
        }}
        className="pt-96"
      >
        <h1>
          <b>TeleDental Sitemap</b>{" "}
        </h1>
        <ul>
          {array.map((a) => {
            return (
              <li
                key={a.name}
                onClick={() => {
                  history.push(a.link);
                }}
                style={{
                  paddingTop: "4px",
                  cursor: "pointer",
                }}
              >
                <b>{a.name}</b>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
