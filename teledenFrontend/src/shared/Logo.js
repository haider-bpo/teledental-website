const Logo = ({ size = "medium", both = false }) => {
  const getSize = () => {
    switch (size) {
      case "small":
        return { logoHeight: 30 };
      case "large":
        return { logoHeight: 50 };
      case "medium":
      default:
        return { logoHeight: 40 };
    }
  };

  const sizeValues = getSize();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      {/* Using placeholder images since we can't import actual images */}
      <div className="logo-container me-2">
        {/* This would be the actual tooth logo with heart image */}
        <img
          src="/images/logo.png"
          alt="Teledental Logo"
          //   style={{ height: `${sizeValues.logoHeight}px`, width: "auto" }}
          style={{
            width: "56px",
            height: "72px",
            top: "183px",
            left: "692px",
          }}
        />
      </div>
      {both && (
        <div>
          {/* This would be the actual Teledental text logo image */}
          <img
            src="/images/teledental.png"
            alt="Teledental Text"
            //   style={{ height: `${sizeValues.logoHeight * 0.8}px`, width: "auto" }}
            style={{
              width: "307px",
              height: "78px",
              top: "255px",
              left: "566px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Logo;
