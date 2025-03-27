/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { Typography, Row, Col } from "antd";

const { Title } = Typography;

const HowChatWorksCard = ({
  data,
  featuresData: { features, featureTitle },
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Row gutter={[10, 10]} className={`d-flex flex-column flex-lg-row`}>
        <Col md={18}>
          <div className={`dentistDescriptionPart`}>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <img src={data[activeIndex].imageSrc} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                }}
              >
                <Title
                  style={{ fontSize: "18px", fontWeight: "600" }}
                  level={3}
                >
                  {data[activeIndex].title}
                </Title>
                <Typography
                  style={{
                    marginTop: "0px",
                    fontSize: "14px",
                  }}
                >
                  {data[activeIndex].description}
                </Typography>
              </div>
            </div>
            {data[activeIndex].tips.map((tip, index) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <Typography
                  style={{ fontSize: "14px", minWidth: "25px" }}
                  className="indexPoints"
                >
                  {index + 1}
                </Typography>
                <Typography style={{ fontSize: "14px", marginLeft: "10px" }}>
                  {tip}
                </Typography>
              </div>
            ))}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              <Typography style={{ fontSize: "18px", fontWeight: "500" }}>
                Have more questions? Email to{" "}
                <a href="javascript:void(0)" className="aTag">
                  service@teledental.com
                </a>
              </Typography>
              <Typography style={{ fontSize: "18px", fontWeight: "500" }}>
                For Frequently Asked Questions,{" "}
                <a href="javascript:void(0)" className="aTag">
                  click here
                </a>
              </Typography>
            </div>
          </div>
        </Col>
        <Col md={6} className={`marginTopForMobileViewOnly`}>
          <Title style={{ fontSize: "18px", fontWeight: "600" }} level={3}>
            {featureTitle}
          </Title>
          {features.map((feature, index) => (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                cursor: "pointer",
                background: activeIndex === index && "#D3D3D3",
              }}
              onClick={() => setActiveIndex(index)}
            >
              <img src={feature.imageSrc} />
              <Typography style={{ fontSize: "14px", marginLeft: "10px" }}>
                {feature.text}
              </Typography>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default HowChatWorksCard;
