import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Row,
  Typography,
  Empty,
} from "antd";
import Avatar from "antd/lib/avatar/avatar";
import dayjs from "dayjs";
import * as React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../Context/userContext";
import FlipMove from "react-flip-move";

const { Text } = Typography;

function ChatHeads({
  requests,
  activeChatId,
  queryClient,
  adminUser,
  loadMoreButtonRef,
  hasNextPage,
  setIsChatHeadClicked,
}) {
  const { user } = useUserContext();

  return (
    <Card
      className="shadow-sm w-100"
      bodyStyle={{ padding: "16px 10px" }}
      style={{
        overflowY: "scroll",
      }}
    >
      <Row className="cbox_leftSrch pb-2 mb-2">
        <Input
          placeholder="Search By Name"
          style={{
            borderRadius: "6px",
            // backgroundColor: "rgba(134, 142, 153, 0.1)",
          }}
          className="chat-search"
          prefix={
            <Button shape="circle" icon={<SearchOutlined />} type="text" />
          }
          // ref={messageInputRef}
          // onPressEnter={sendMessage}
        />
      </Row>
      {/* <Divider
        style={{
          background: "#c5c5c5",
          margin: "20px 0 0",
        }}
      /> */}
      <div
        className="customScroll"
        // style={{
        //   minHeight: "60vh",
        //   maxHeight: "calc(100vh - 300px)",
        //   overflowY: "auto",
        //   overflowX: "hidden",
        //   flexDirection: "column-reverse",
        //   flexWrap: "nowrap",
        //   paddingTop: "5px",
        // }}
      >
        {/* <FlipMove duration={350} className={`d-flex flex-lg-column`}> */}
        <FlipMove duration={350}>
          {requests?.pages[0]?.length > 0 ? (
            requests.pages
              .flat()
              // .filter((request) => request.assignedTo)
              .sort((a, b) => {
                return (
                  new Date(b?.lastMessage?.createdAt) -
                  new Date(a?.lastMessage?.createdAt)
                );
              })
              ?.map((request, index) => {
                const otherUser =
                  user?.model === "patients" && !request?.assignedTo
                    ? adminUser
                    : request?.[
                        user?.model === "dentists" ? "patient" : "assignedTo"
                      ];
                // const currentUser =
                //   request?.[
                //     user?.model === "dentists" ? "assignedTo" : "patient"
                //   ];
                return (
                  <div
                    key={request._id}
                    className={`${index !== 0 ? "mt-2" : ""} `}
                  >
                    <Link
                      to={`/${user.model}/messages/${request._id}`}
                      onClick={() => setIsChatHeadClicked(true)}
                    >
                      <div
                        className={`hover-bg light-border  shadow-sm ${
                          request._id === activeChatId && "selected-state-bg"
                        } ${
                          request.rejectedBy.includes(user._id) && "rejected-bg"
                        }`}
                        style={{
                          padding: "10px 5px",
                        }}
                      >
                        <Row style={{ paddingRight: "10px" }}>
                          <Col
                            span={4}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                            className={`messageThreadSelectorCardAvatar`}
                          >
                            <Avatar
                              className="message-avatar"
                              style={{ width: "56px", height: "56px" }}
                              src={queryClient.getQueryData([
                                "profile-image",
                                otherUser?._id,
                              ])}
                            >
                              <span className="capitalize">
                                {otherUser?.firstName?.[0]}
                              </span>
                            </Avatar>
                          </Col>
                          <Col
                            span={20}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                            className={`messageThreadSelectorCardContent`}
                          >
                            <Row>
                              <Text strong className="capitalize">
                                {otherUser?.firstName +
                                  " " +
                                  otherUser?.lastName}
                              </Text>
                            </Row>
                            <Row
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <Text
                                style={{ color: "#6c757d" }}
                                className="capitalize"
                              >
                                {request.lastMessage?.sender === user._id ||
                                request.lastMessage?.sender === adminUser?._id
                                  ? "You"
                                  : request.lastMessage?.sender ===
                                    request.patient._id
                                  ? request?.patient?.firstName
                                  : request?.assignedTo?.firstName}
                                :{" "}
                                {request.lastMessage?.message.split(":")[0] ===
                                "IMAGE"
                                  ? "Shared image"
                                  : `${request.lastMessage?.message
                                      .substring(0, 18)
                                      .trim()}
                                      ${
                                        request.lastMessage?.message.length > 18
                                          ? "..."
                                          : ""
                                      }`}
                              </Text>
                              <Text>
                                {String(
                                  dayjs(request.lastMessage?.createdAt).fromNow(
                                    true
                                  )
                                )}
                              </Text>
                            </Row>
                            {/* <Button
                              style={{
                                width: "40px",
                                height: "40px",
                                position: "absolute",
                                right: 10,
                                top: 10,
                              }}
                              shape="circle"
                              icon={
                                <MoreOutlined
                                  rotate={90}
                                  style={{ fontSize: "29px" }}
                                />
                              }
                            /> */}
                          </Col>
                        </Row>
                      </div>
                    </Link>
                  </div>
                );
              })
          ) : (
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Empty />
            </Row>
          )}
        </FlipMove>
        {/* Target element for Intersection Observer */}
        {
          <div
            ref={loadMoreButtonRef}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <span
              style={{
                display: hasNextPage ? "block" : "none",
                height: "12px",
                width: "12px",
                backgroundColor: "#1890ff",
                borderRadius: "50%",
              }}
            ></span>
          </div>
        }
      </div>
    </Card>
  );
}

export default ChatHeads;
