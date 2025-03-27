import { Card, Col, Image, Row, Typography } from "antd";
import dayjs from "dayjs";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getImage } from "../Commons/apis/commonV1";
import { useUserContext } from "../Context/userContext";
import { getRequestById } from "./apis/patientV1";
import Header from "../Commons/Header";
const { Title, Text } = Typography;
function RequestDetails() {
  let { id } = useParams();
  const { user } = useUserContext();
  const { data, isLoading } = useQuery(["requests", id], async () => {
    const res = await getRequestById({ id });
    return res.data;
  });
  const { data: images, isLoading: imagesLoading } = useQuery(
    ["requests-images", id],
    async () => {
      let imagesRequests = [];

      for (let attachment of data.attachments) {
        imagesRequests.push(getImage({ key: attachment }));
      }

      const res = await Promise.all(imagesRequests).then(
        (response) => response
      );
      return res;
    },
    {
      enabled: !isLoading,
    }
  );
  return (
    <><Header />
    <div className={`paddingParent`} style={{"marginTop": "70px" }}>
      <Row style={{ display: "flex", justifyContent: "center" }}>
        <Title level={3}>Request Details</Title>
      </Row>
      {data?.attachments ? (
        images ? (
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0",
            }}
          >
            <Image.PreviewGroup>
              {images.map(({ data }) => (
                <Image
                  width={200}
                  height={200}
                  src={data}
                  loading={imagesLoading} />
              ))}
            </Image.PreviewGroup>
          </Row>
        ) : (
          <Row style={{ height: "200px" }}></Row>
        )
      ) : null}
      <Card
        headStyle={{ fontWeight: "bold" }}
        loading={isLoading}
        title={`Request DATE: ${dayjs(data?.createdAt).format(
          "DD/MM/YYYY hh:mm:ss A"
        )}`}
        type="inner"
        style={{ maxWidth: 900, margin: "0 auto 20px" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <Row style={{ marginBottom: "5px" }}>
            <Text strong={true}>Request for:</Text>
          </Row>
          <div>
            {data?.type?.map((item, index) => (
              <Row key={index}>
                <Text>{item}</Text>
              </Row>
            ))}
          </div>
        </div>
        <Row style={{ marginBottom: "10px" }}>
          <Col span={12}>
            <Row style={{ marginBottom: "5px" }}>
              <Text strong={true}>Emergency:</Text>
            </Row>
            <Row>
              <Text>{data?.isEmergency ? "Yes" : "No"}</Text>
            </Row>
          </Col>
          <Col span={12}>
            <Row style={{ marginBottom: "5px" }}>
              <Text strong={true}>Pain Level:</Text>
            </Row>
            <Row>
              <Text>{data?.painLevel}</Text>
            </Row>
          </Col>
        </Row>
        <div style={{ marginBottom: "10px" }}>
          <Row style={{ marginBottom: "5px" }}>
            <Text strong={true}>Request Title:</Text>
          </Row>
          <Row>
            <Text>{data?.title}</Text>
          </Row>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Row style={{ marginBottom: "5px" }}>
            <Text strong={true}>Request Description:</Text>
          </Row>
          <Row>
            <Text>{data?.description}</Text>
          </Row>
        </div>
      </Card>
      <Card
        headStyle={{ fontWeight: "bold" }}
        loading={isLoading}
        title="PATIENT FINANCING"
        type="inner"
        style={{ maxWidth: 900, margin: "0 auto 20px" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <Row style={{ marginBottom: "5px" }}>
            <Text strong={true}>Interested in patient financing:</Text>
          </Row>
          <Row>
            <Text>{data?.procedure?.status === true ? "Yes" : "No"}</Text>
          </Row>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Row style={{ marginBottom: "5px" }}>
            <Text strong={true}>Have a regular dentist:</Text>
          </Row>
          <Row>
            <Text>{data?.dentalCare?.status === true ? "Yes" : "No"}</Text>
          </Row>
        </div>
      </Card>
      <Card
        headStyle={{ fontWeight: "bold" }}
        loading={isLoading}
        title="LOCATION"
        type="inner"
        style={{ maxWidth: 900, margin: "0 auto 20px" }}
      >
        <div>
          <Row style={{ marginBottom: "5px" }}>
            <Text strong={true}>Current Location:</Text>
          </Row>
          <Row>
            <Text>{user?.location?.address}</Text>
          </Row>
        </div>
      </Card>
      <Card
        headStyle={{ fontWeight: "bold" }}
        loading={isLoading}
        title="ADDITIONAL INFORMATION"
        type="inner"
        style={{ maxWidth: 900, margin: "0 auto 20px" }}
      >
        <div style={{ marginBottom: "10px" }}>
          <Row style={{ marginBottom: "5px" }}>
            <Text strong={true}>Do you have dental insurance:</Text>
          </Row>
          <Row>
            <Text>{data?.insurance?.status === true ? "Yes" : "No"}</Text>
          </Row>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Row style={{ marginBottom: "5px" }}>
            <Text strong={true}>
              Last time you had a Dental prophy / cleaning at a dentist:
            </Text>
          </Row>
          <Row>
            <Text>{data?.lastCleaning}</Text>
          </Row>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Row style={{ marginBottom: "5px" }}>
            <Text strong={true}>Last visit to the dentist:</Text>
          </Row>
          <Row>
            <Text>{data?.lastVisit}</Text>
          </Row>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <Row style={{ marginBottom: "5px" }}>
            <Text strong={true}>Last time had dental x-rays:</Text>
          </Row>
          <Row>
            <Text>{data?.lastDentalXRay}</Text>
          </Row>
        </div>
      </Card>
    </div></>
  );
}

export default RequestDetails;
