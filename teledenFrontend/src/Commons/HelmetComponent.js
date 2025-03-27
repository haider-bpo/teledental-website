import { Helmet } from "react-helmet";

import React from "react";

function HelmetComponent({ title, name, content }) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name={name} content={content} />
    </Helmet>
  );
}

export default HelmetComponent;
