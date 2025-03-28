import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useMetadata } from "../Context/useMetadataContext";

const withMetaData = (WrappedComponent) => {
  // Return a new component
  const WithMetaData = (props) => {
    const location = useLocation(); // Get current route
    const metaData = useMetadata(); // Get head details from Context
    const routeMetadata = metaData[location.pathname] || {
      title: "Your Trusted Teledental Care | TeleDental Services",
      description:
        "Experience seamless virtual dental care with TeleDental. Book online consultations for all your dental needs today!",
      canonicalUrl: "https://teledental.com/",
    }; // Fallback for undefined routes

    const { title, description, canonicalUrl } = routeMetadata;
    // const canonicalUrl = `https://teledental.com${location.pathname}`; // Dynamic URL
    const ogImage = "/assets/img/logo.webp";

    return (
      <>
        <Helmet>
          {/* Standard meta tags */}
          <title>{title}</title>
          <meta name="description" content={description} />
          {/* <meta name="keywords" content={keywords} /> */}
          <meta name="robots" content="index, follow" />

          {/* Open Graph tags */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={ogImage} />
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:type" content="website" />

          {/* Twitter Card tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={ogImage} />

          {/* Canonical URL */}
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <WrappedComponent {...props} />
      </>
    );
  };

  WithMetaData.displayName = `WithMetaData(${
    WrappedComponent.name || "Component"
  })`;
  return WithMetaData;
};

export default withMetaData;
