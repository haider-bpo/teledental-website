import React, { createContext, useContext } from "react";

const defaultHeadDetails = {
  "/": {
    title: "Home | My React App",
    description: "Welcome to our professional React application.",
    keywords: "home, react, seo",
    ogImage: "https://example.com/home-og-image.jpg",
  },
  "/about": {
    title: "About | My React App",
    description: "Learn more about our team and mission.",
    keywords: "about, team, react",
    ogImage: "https://example.com/about-og-image.jpg",
  },
};

const HeadContext = createContext(defaultHeadDetails);

export const HeadProvider = ({ children }) => {
  return (
    <HeadContext.Provider value={defaultHeadDetails}>
      {children}
    </HeadContext.Provider>
  );
};

export const useHeadDetails = () => useContext(HeadContext);
