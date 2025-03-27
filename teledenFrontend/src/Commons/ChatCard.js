import {
  PaperClipOutlined,
  SendOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Drawer,
  Input,
  message,
  Result,
  Row,
  Space,
  Spin,
  Tag,
  Tooltip,
  Typography,
  Upload,
  Modal
} from "antd";
import React, { useState, useEffect, useRef } from "react";
import AgoraToken from "../Commons/AgoraMeeting/AgoraToken";
import Avatar from "antd/lib/avatar/avatar";
import dayjs from "dayjs";
// import * as React from "react";
import { setupIntent, videoConsult } from "../Patient/apis/patientV1";
import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router";
import { useUserContext } from "../Context/userContext";
import { acceptConsultation } from "../Dentist/apis/dentistV1";
import ConsultationRequestModal from "../Patient/ConsultationRequestModal";
import BookAppointment from "../Patient/BookAppointment";
import generateToken from "../utils/generateToken";
import {
  acceptRequest,
  getRequestStatsForAdmin,
  rejectRequest,
} from "./apis/commonV1";
import Messages from "./Messages";

const { Text } = Typography;

function ChatCard({
  messages,
  sendMessage,
  sendAttachment,
  uploadAttachmentLoading,
  acceptRequest: acceptRequestHandler,
  rejectRequest: rejectRequestHandler,
  messageInputRef,
  areMessagesLoading,
  activeChat,
  adminUser,
  loadMoreButtonRef,
  hasNextPage,
  queryClient,
  setIsChatHeadClicked,
  setValue
}) {
  const history = useHistory();
  const [VideoTitleVal, setVideoTitleVal] = useState('Video Consultancy');
  const [showVideoModal, setVideoModal] = useState(false);
  const [showTokenInput, setTokenInput] = useState(true);
  const [roomName, setroomName] = useState('');
  const [roomNameAgora, setroomNameAgora] = useState('');
  const [patientContactNumber, setPatientContactNumber] = useState('');
  const child = React.createRef();

  const handleRoomNameChange = () => {
    setroomNameAgora(roomName);
    setTokenInput(false);
  };

  const closeVideoModal = () => {
    //setVideoModal(false);
    window.location.reload();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setVideoModal(true);
      // var setupIntentRes = await videoConsult(activeChatId);
    } catch (err) {
      message.error(err.errMsg);
      // setIsLoading(false);
    }
  }

  const { user, profilePhoto: myProfilePhoto, paymentInfo } = useUserContext();

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isConsultationModalVisible, setIsConsultationModalVisible] =
    React.useState(false);
  const [isAppointmentModalVisible, setIsAppointmentModalVisible] =
    React.useState(false);

  const { data: stats } = useQuery(
    ["requestStatsAdmin", activeChat?._id],
    async () => {
      const res = await getRequestStatsForAdmin({ id: activeChat?._id });
      return res.data;
    }
  );
  // const { refetch: refetchMeetingLink, isLoading: isMeetingLinkLoading } =
  //   useQuery(
  //     ["meeting-link", activeChat?._id],
  //     async () => {
  //       const res = await getMeetingLink({ id: activeChat?._id });
  //       window.location.href = `${res.data}&email=${user.email}&name=${user.firstName}&id=${user._id}`;
  //     },
  //     {
  //       enabled: false,
  //     }
  //   );

  function viewRequestDetailsHandler() {
    history.push(`/${user.model}/request/${activeChat._id}`);
  }

  // const messagesEnd = React.useRef();
  // const scrollToBottom = () => {
  //   this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  // };

  const { mutateAsync: acceptRequestFn, isLoading: acceptMutationIsLoading } =
    useMutation(acceptRequest);
  const { mutateAsync: rejectRequestFn, isLoading: rejectMutationIsLoading } =
    useMutation(rejectRequest);

  // const { mutateAsync: createSessionFn } = useMutation(createSession, {
  //   onError: (err, variables) => {
  //     console.log({ err });
  //   },
  //   onSuccess: (data, variables) => {
  //     const {
  //       userInfo: { token },
  //       roomInfo: { sid },
  //     } = data;
  //     window.open(`/${user.model}/video-chat/${sid}?token=${token}`, "_blank");
  //     // history.push(`/${user.model}/video-chat/${sid}?token=${token}`);
  //   },
  // });

  const otherUser =
    user?.model === "patients" && !activeChat?.assignedTo
      ? adminUser
      : activeChat?.[user?.model === "dentists" ? "patient" : "assignedTo"];

  async function requestConsultationHandler() {
    setIsConsultationModalVisible(true);
    // requestConsultationFn({
    //   body: {
    //     productId: "60de106bbe5c460f220f370c",
    //     requestId: activeChat._id,
    //   },
    // });
  }
  async function requestAppointmentHandler() {
    setIsAppointmentModalVisible(true);
  }

  const {
    mutateAsync: acceptConsultationFn,
    isLoading: acceptConsultationIsLoading,
  } = useMutation(acceptConsultation);

  async function acceptConsultationHandler() {
    try {
      // Session won't exist if you already have made an API call for requests -- FIX IT
      await acceptConsultationFn({
        id: activeChat.session._id,
      });
      const token = generateToken({ user, activeChat });
      window.open(`https://meet.teledental.com/?token=${token}`, "_blank");
      // window.location.href = ;
    } catch (error) {
      console.log({ error });
      message.error(error.errMsg);
    }
  }

  return (
    <>
      <Modal title={VideoTitleVal} style={{ top: "25px" }}
        width={'75%'}
        minHeight={'70vh'}
        visible={showVideoModal}
        onCancel={closeVideoModal}
        footer={null}
      >
        <div className="row">
          <div className="col-lg-7 mb-1">
            <div className="">
              <div className="pt-1">{showTokenInput && (
                <>
                  <Input className="col-sm-12 col-md-5" style={{marginRight: '5px', width: '22%'}} placeholder="Room Name" value={roomName}
                    onChange={event => setroomName(event.target.value)} />
                  <Input className="col-sm-12 col-md-6" placeholder="Patient Contact Number (add 1 for USA)" value={patientContactNumber}
                    onChange={event => setPatientContactNumber(event.target.value)} />
                    <Button
                  style={{ width: "150px", padding: '10px 60px 10px 60px', marginLeft: '5px' }}
                  className="brix---btn-secondary w-button d-inline-flex align-items-center justify-content-center"
                  block
                  type="primary"
                  size="large"
                  onClick={handleRoomNameChange}
                >
                  Create Room
                </Button></>
              )}</div>
            </div>
          </div>
          <div className="col-lg-5">
            <div style={{ textAlign: "center", fontWeight: "bold" }}>
              {roomNameAgora ? <AgoraToken text={roomNameAgora} patientContactNumber={patientContactNumber} /> : ""}
            </div>
          </div>
        </div>
      </Modal>
      <Card
        className=" messageChatContent"
        bodyStyle={{}}
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "hidden",
          // backgroundColor: "#f2f2f2",
        }}
      >
        <div className={`mt-2 d-lg-none`}>
          <Tooltip title="Back">
            <Button
              type="text"
              shape="round"
              icon={<ArrowLeftOutlined />}
              onClick={() => setIsChatHeadClicked(false)}
            />
          </Tooltip>
        </div>
        {areMessagesLoading ? (
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Spin />
          </Row>
        ) : !activeChat ? (
          <Result
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            title={
              user?.model === "dentists" && !paymentInfo?.accountId
                ? "Fill out your account information so that you can start receiving request from your customer."
                : "You don't have any conversation yet."
            }
          />
        ) : (
          <>
            <Row
              style={{
                justifyContent: "space-between",
                borderBottom: "1px solid #e0f2fc",
                padding: "10px 15px 5px 15px",
              }}
              className={`d-flex flex-column flex-md-row cbox_msg_avatarInfoRow`}
            >
              <Col span={18} className={``}>
                <Row>
                  <Col className={`minWidthForRequestHeading`}>
                    <strong>Request Date : </strong>{" "}
                  </Col>
                  <Col>
                    <span>{String(dayjs(activeChat?.createdAt))}</span>
                  </Col>
                </Row>
                <Row style={{ color: "#0071bc" }} className={`mt-2`}>
                  <Col className={`minWidthForRequestHeading`}>
                    <strong>Request Title : </strong>
                  </Col>
                  <Col>
                    <strong>{activeChat?.title}</strong>
                  </Col>
                </Row>
                <Row className={`mt-2`}>
                  <Col className={`minWidthForRequestHeading`}>
                    <strong>Request : </strong>
                  </Col>
                  <Col>
                    <strong style={{ color: "#dc3545" }}> EMERGENCY</strong>
                  </Col>
                </Row>
              </Col>
              <Col
                span={6}
                className={` ViewRequestDetailsButtonDiv d-flex justify-content-end`}
              >
                <Row
                // style={{ justifyContent: "flex-end" }}
                >
                  <Space>
                    {/* <Tooltip title="Mark as favorite">
                            <Button shape="circle" icon={<HeartOutlined />} />
                          </Tooltip>
                          <Button>Add</Button> */}
                    <Button
                      onClick={viewRequestDetailsHandler}
                      className="btn_blue"
                    >
                      View Request Details
                    </Button>
                  </Space>
                </Row>
              </Col>
            </Row>

            <Row
              style={{
                justifyContent: "space-between",
                borderBottom: "1px solid #e0f2fc",
                padding: "10px 15px 10px 15px",
              }}
              className={`d-flex flex-column flex-md-row`}
            >
              <Col span={12} className={`width100`}>
                <Row style={{ alignItems: "baseline" }}>
                  <Col span={4} style={{ maxWidth: "56px" }}>
                    <Avatar
                      className="message-avatar"
                      style={{ width: "46px", height: "46px" }}
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
                  <Col span={20}>
                    <Row className={`messageToName`}>
                      <Text strong className="capitalize">
                        {otherUser?.firstName + " " + otherUser?.lastName}
                      </Text>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Col
                span={12}
                className={`width100 ViewRequestDetailsButtonDiv d-flex justify-content-end`}
              >
                <Row style={{ justifyContent: "flex-end" }}>
                  <Space
                    className={`d-flex flex-column flex-md-row justify-content-center align-items-center`}
                  >
                    {user?.model === "dentists" && user?.role === "admin" && (
                      <Button
                        onClick={() => setIsModalVisible(true)}
                        className={`btn_pink`}
                      >
                        Show Stats
                      </Button>
                    )}
                    {user?.model === "patients" && (
                      <Tooltip
                        title={
                          activeChat?.session?.status === "completed"
                            ? "You can only create 1 session for a request. In order to consult this dentist again, you must create a new request"
                            : null
                        }
                      >
                        <Button
                          onClick={requestConsultationHandler}
                          disabled={
                            !activeChat?.assignedTo?._id ||
                            activeChat?.session?.status === "completed"
                          }
                          className={`btn_blue`}
                        >
                          Request Video Consultation
                        </Button>
                        <Button style={{ marginLeft: "15px" }}
                          onClick={requestAppointmentHandler}
                          disabled={
                            !activeChat?.assignedTo?._id ||
                            activeChat?.session?.status === "completed"
                          }
                          className={`btn_blue`}
                        >
                          Book Appointment
                        </Button>
                      </Tooltip>
                    )}
                    {user?.model === "dentists" &&
                      activeChat?.session?._id &&
                      activeChat?.session?.status !== "completed" && (
                        <Button
                          disabled={!activeChat?.assignedTo?._id}
                          loading={acceptConsultationIsLoading}
                          onClick={acceptConsultationHandler}
                          className={`startVideoButton`}
                        >
                          Start Video Consultation
                        </Button>
                      )}
                    {user?.model === "dentists" &&
                      activeChat?.assignedTo?._id && (
                        <Button style={{ marginLeft: "5px" }}
                          onClick={requestAppointmentHandler}
                          className={`btn_blue`}
                          disabled={
                            !activeChat?.assignedTo?._id ||
                            activeChat?.session?.status === "completed"
                          }
                        >
                          Book Appointment
                        </Button>

                      )}
                    {user?.model === "dentists" &&
                      activeChat?.assignedTo?._id && (
                        <Button style={{ marginLeft: "5px" }}
                          onClick={handleSubmit}
                          className={`btn_blue`}
                          disabled={
                            !activeChat?.assignedTo?._id ||
                            activeChat?.session?.status === "completed"
                          }
                        >
                          Video Consultancy With Agora
                        </Button>

                      )}
                    {/* <Button>Request Appointment</Button> */}
                    {/* <Button>Receive SMS</Button> */}
                  </Space>
                </Row>
              </Col>
            </Row>
            {user?.model === "dentists" &&
              !activeChat?.assignedTo?._id &&
              !activeChat?.rejectedBy?.includes(user?._id) ? (
              <>
                <Row
                  style={{
                    justifyContent: "space-between",
                    borderBottom: "1px solid #e0f2fc",
                    padding: "10px 15px 10px",
                    rowGap: "0px",
                  }}
                >
                  <Button
                    type="primary"
                    className="shadow-sm hover"
                    danger
                    style={{ width: "49%" }}
                    loading={rejectMutationIsLoading}
                    onClick={async () => {
                      await rejectRequestFn({ id: activeChat._id });
                      rejectRequestHandler();
                    }}
                  >
                    Reject
                  </Button>
                  <Button
                    type="primary"
                    className="shadow-sm hover"
                    success
                    style={{
                      width: "49%",

                      backgroundColor: "#28a745",
                    }}
                    loading={acceptMutationIsLoading}
                    onClick={async () => {
                      await acceptRequestFn({ id: activeChat._id });
                      acceptRequestHandler();
                    }}
                  >
                    Accept
                  </Button>
                </Row>
              </>
            ) : null}
            <Messages
              user={user}
              activeChat={activeChat}
              messages={messages}
              adminUser={adminUser}
              myProfilePhoto={myProfilePhoto}
              queryClient={queryClient}
              loadMoreButtonRef={loadMoreButtonRef}
              hasNextPage={hasNextPage}
            />
            <Row
              style={{
                padding: "15px 60px 15px 15px",
              }}
            >
              {(activeChat?.assignedTo?._id && user?.model === "patients") ||
                (activeChat?.assignedTo?._id === user._id &&
                  !activeChat?.rejectedBy?.includes(user?._id)) ? (
                <Input
                  placeholder="Enter your message..."
                  style={{ borderRadius: "6px" }}
                  prefix={
                    <div style={{ display: "flex" }}>
                      <Tooltip title="Add Attachment">
                        <Upload
                          name="file"
                          beforeUpload={(file) => {
                            sendAttachment(file);
                            return false;
                          }}
                          fileList={[]}
                        >
                          <Button
                            shape="circle"
                            icon={<PaperClipOutlined />}
                            type="text"
                          />
                        </Upload>
                      </Tooltip>
                      {/* <Tooltip title="Video Chat">
                      <Button
                        shape="circle"
                        icon={<VideoCameraOutlined />}
                        type="text"
                        onClick={async () =>
                          await createSessionFn({
                            payload: { requestId: activeChat?._id },
                          })
                        }
                      />
                    </Tooltip> */}
                    </div>
                  }
                  value={messageInputRef}
                  onChange={e => setValue(e.target.value)}
                  onPressEnter={sendMessage}
                  suffix={
                    <Tooltip title="Send">
                      <Button
                        type="text"
                        shape="round"
                        icon={<SendOutlined />}
                        onClick={sendMessage}
                      />
                    </Tooltip>
                  }
                />
              ) : (
                <>
                  {user?.model === "dentists" ? (
                    <Row
                      style={{
                        // marginBottom: "15px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      {activeChat?.rejectedBy?.includes(user?._id) ||
                        (activeChat?.assignedTo?._id &&
                          activeChat?.assignedTo?._id !== user?._id) ? (
                        <Row
                          style={{
                            backgroundColor: "rgba(0, 113, 188, 0.8)",
                            width: "100%",
                            // minHeight: "40px",
                            padding: `10px 5px`,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text style={{ color: "#FFF" }}>
                            {activeChat?.rejectedBy?.includes(user?._id)
                              ? "You declined this request"
                              : "Someone has already accepted this request"}
                          </Text>
                        </Row>
                      ) : // To show accept/reject buttons
                        null}
                    </Row>
                  ) : (
                    <Row
                      style={{
                        backgroundColor: "rgba(0, 113, 188, 0.8)",
                        width: "100%",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ color: "#FFF" }}>
                        {user.model === "dentists"
                          ? "You can't reply to this conversation"
                          : "You can't reply to this conversation now"}
                      </Text>
                    </Row>
                  )}
                </>
              )}
            </Row>
          </>
        )}
        <Drawer
          title="Request Stats"
          placement="right"
          closable={false}
          onClose={() => setIsModalVisible(false)}
          visible={isModalVisible}
        // width="85%"
        >
          <Col className="customScroll">
            {stats &&
              stats?.requestedTo.map((assignedUser) => (
                <Row style={{ paddingRight: "10px" }}>
                  <Divider
                    style={{
                      margin: "10px 0",
                      borderTop: "1px solid rgba(0, 0, 0, .3)",
                    }}
                  />
                  <div
                    className={`d-flex w-100`}
                    style={{
                      maxWidth: "170px",
                    }}
                  >
                    <Col
                      span={4}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                      className={`userCardAvatar`}
                    >
                      <Avatar
                        className="message-avatar"
                        style={{ width: "46px", height: "46px" }}
                        src={queryClient.getQueryData([
                          "profile-image",
                          assignedUser?._id,
                        ])}
                      >
                        <span className="capitalize">
                          {assignedUser?.firstName?.[0]}
                        </span>
                      </Avatar>
                    </Col>
                    <Col
                      span={20}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignassignedUsers: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Text strong className="capitalize">
                          {assignedUser?.firstName +
                            " " +
                            assignedUser?.lastName}
                        </Text>
                        {assignedUser._id === stats.assignedTo ? (
                          <Tag className="custom-tag" color="success">
                            Accepted
                          </Tag>
                        ) : stats.rejectedBy.includes(assignedUser._id) ? (
                          <Tag className="custom-tag" color="error">
                            Rejected
                          </Tag>
                        ) : (
                          <Tag className="custom-tag">Pending</Tag>
                        )}
                      </Row>
                    </Col>
                  </div>
                </Row>
              ))}
          </Col>
        </Drawer>
        <ConsultationRequestModal
          acitveChatId={activeChat?._id}
          isModalVisible={isConsultationModalVisible}
          setIsModalVisible={setIsConsultationModalVisible}
        />
        <BookAppointment
          acitveChatId={activeChat?._id}
          activeChat={activeChat}
          isModalVisible={isAppointmentModalVisible}
          setIsModalVisible={setIsAppointmentModalVisible}
          fromDentist={user?.model == "dentists"}
          setValue={setValue}
          sendMessage={sendMessage}
        />
      </Card>
    </>
  );
}

export default ChatCard;
