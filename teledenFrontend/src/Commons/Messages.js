import { Col, Image, Row, Tooltip } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import dayjs from "dayjs";
import * as React from "react";
import Linkify from "react-linkify";
import constants from "../constants";
import { useMessagesAttachment } from "../Hooks/useProfilePhoto";
import generateToken from "../utils/generateToken";

export default function Messages({
  user,
  activeChat,
  messages,
  adminUser,
  myProfilePhoto,
  queryClient,
  loadMoreButtonRef,
  hasNextPage,
}) {
  // To fetch message attachments
  useMessagesAttachment(messages);

  return (
    <div className="customScroll cbox_msg_scrolable"
      style={{
        // flex: "1 1 0",
        overflow: "auto",
        // maxHeight: "39vh",
        // maxHeight: "39vh",
        // padding: "0 15px",
      }}
    >
      <Row
        // className="messageContainer"
        className="customScroll messageContainer"
        style={{
          //height: "30vh",
          //   user?.model === "dentists" &&
          //   !activeChat?.assignedTo?._id &&
          //   !activeChat?.rejectedBy.includes(user._id)
          //     ? "440px"
          //     : "480px",
          overflowX: "hidden",
          flexDirection: "column-reverse",
          flexWrap: "nowrap",
          paddingRight: "15px",
          paddingLeft: "10px",
        }}
      >
        {messages?.pages?.map((page) =>
          page?.map(
            ({ message, sender, createdAt, _id, file, type = "" }, index) => {
              const myMessage =
                sender === user._id ||
                (user.model === "dentists" &&
                  (sender === activeChat?.assignedTo?._id ||
                    sender === adminUser?._id));
              return (
                <Row
                  style={{
                    marginBottom: "10px",
                  }}
                  key={index}
                >
                  <Col
                    order={myMessage ? 2 : 1}
                    style={{
                      display: "flex",
                      width: "30px",
                    }}
                  >
                    <Row
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                      }}
                    >
                      <Avatar
                        style={{ width: "28px", height: "28px" }}
                        src={
                          sender === user?._id ||
                          (user.model === "dentists" &&
                            sender === adminUser?._id)
                            ? myProfilePhoto
                            : queryClient.getQueryData([
                                "profile-image",
                                activeChat?.[
                                  user?.model === "dentists"
                                    ? sender === activeChat?.assignedTo?._id
                                      ? "assignedTo"
                                      : "patient"
                                    : "assignedTo"
                                ]?._id ?? adminUser?._id,
                              ])
                        }
                      >
                        <span className="capitalize ">
                          {sender === user._id ||
                          (user.model === "dentists" &&
                            sender === adminUser?._id)
                            ? user?.name?.[0]
                            : activeChat?.[
                                user.model === "dentists"
                                  ? sender === activeChat?.assignedTo?._id
                                    ? "assignedTo"
                                    : "patient"
                                  : "assignedTo"
                              ]?.firstName[0] ?? adminUser?.firstName[0]}
                        </span>
                      </Avatar>
                    </Row>
                  </Col>
                  <Col
                    style={{
                      flex: 1,
                    }}
                    order={myMessage ? 1 : 2}
                  >
                    {" "}
                    <Tooltip title={String(dayjs(createdAt))}>
                      <Row
                        className={`message ${
                          message.split(":")[0] === "IMAGE" &&
                          "attachmentMessage"
                        } ${myMessage ? "myMessage" : "otherMessage"}`}
                        justify="end"
                      >
                        {message.split(":")[0] === "IMAGE" ? (
                          <Image
                            style={{
                              width: "200px",
                              height: "120px",
                              background: "white",
                              boxShadow:
                                "0 .125rem .25rem rgba(0,0,0,.075)!important",
                              padding: "10px",
                            }}
                            // src={queryClient.getQueryData(["message-image", _id])}
                            src={
                              message.split(":")[1] === "LOCAL"
                                ? URL.createObjectURL(file)
                                : queryClient.getQueryData([
                                    "message-image",
                                    _id,
                                  ])
                            }
                          />
                        ) : (
                          <span
                            className="message-links"
                            style={{
                              fontWeight:
                                constants.MESSAGE_TYPES.includes(type) &&
                                activeChat?.session?._id
                                  ? 600
                                  : 400,
                            }}
                          >
                            <Linkify
                              hrefDecorator={(href) => {
                                const token = generateToken({
                                  user,
                                  activeChat,
                                });
                                if (
                                  href.includes(
                                    "https://meet.teledental.com/"
                                  ) &&
                                  type === "CONSULTATION_LINK"
                                ) {
                                  return `${href}?token=${token}`;
                                } else {
                                  return href;
                                }
                              }}
                              componentDecorator={componentDecorator}
                            >
                              {message}
                            </Linkify>
                          </span>
                        )}
                      </Row>
                    </Tooltip>
                  </Col>
                </Row>
              );
            }
          )
        )}
        {/* Target element for Intersection Observer */}
        <div
          ref={loadMoreButtonRef}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            height: "12px",
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
      </Row>
    </div>
  );
}

const componentDecorator = (href, text, key) => {
  return (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  );
};
