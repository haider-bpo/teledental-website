import { Col, Row, Spin, Typography } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import * as React from "react";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useUserContext } from "../Context/userContext";
import useAdminData from "../Hooks/useAdminData";
import { useChat } from "../Hooks/useChat";
import useIntersectionObserver from "../Hooks/useIntersectionObserver";
import { useProfilePhotos } from "../Hooks/useProfilePhoto";
import { getRequests } from "./apis/commonV1";
import ChatCard from "./ChatCard";
import ChatHeads from "./ChatHeads";
import HowChatWorksModal from "./HowChatWorksModal";
import Header from "./Header";
import { useHistory } from "react-router-dom";
import { getSubscription } from "../Commons/apis/commonV1"
import Subscription from "../Commons/Subscription";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "1 minute",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    M: "a month",
    MM: "%d months",
    y: "a year",
    yy: "%d years",
  },
});

const { Title } = Typography;

export default function Inbox() {
  const { user } = useUserContext();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();
  const [apoint, setAppoint] = React.useState("hidden");

  // REQUESTS
  const {
    data: requests,
    isLoading,
    refetch: refetchRequests,
    fetchNextPage,
    hasNextPage: requestHasNextPage,
  } = useInfiniteQuery(
    "requests",
    async ({ pageParam = 0 }) => {
      const res = await getRequests({
        queryParam: {
          limit: 10,
          cursor: pageParam === 0 ? undefined : pageParam,
        },
      });
      return res.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length
          ? allPages?.[allPages?.length - 1]?.length === 10 // same as the limit
            ? JSON.stringify({ lastId: allPages?.[allPages?.length - 1][
                allPages?.[allPages?.length - 1].length - 1
              ]._id, firstId: allPages[0][0]._id })
            : undefined // To stop it from calling the api again
          : 0;
      },
      refetchOnWindowFocus: false,
    }
  );

  // STATES & REF
  const requestLoadMoreButtonRef = React.useRef();
  const threadLoadMoreButtonRef = React.useRef();
  const [messageInputRef, setValue] = React.useState("");
  const activeChatIdRef = React.useRef(id ?? requests?.pages?.flat()?.[0]?._id);
  const [activeChatId, setActiveChatId] = React.useState(
    // ?.filter((request) => request.assignedTo)
    id ?? requests?.pages?.flat()?.[0]?._id
  );
  const [activeChat, setActiveChat] = React.useState(null);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isChatHeadClicked, setIsChatHeadClicked] = React.useState(false);
  const [isSubscriptionModalVisible, setSubscriptionModalVisible] =
  React.useState(false);
  const [isTrialGet, setTrialGet] =
  React.useState(false);


  const showModal = () => {
    // setIsModalVisible(true);
    history.push(`/dentists/howitworks`);
  };

  const showModalAppoinments = () => {
    history.push(`/patients/myappointments`);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // CUSTOM HOOKS
  const {
    sendMessage,
    sendAttachment,
    acceptRequest,
    rejectRequest,
    messages,
    areMessagesLoading,
    hasNextPage: threadHasNextPage,
    uploadAttachmentLoading,
  } = useChat(
    messageInputRef,
    activeChat,
    activeChatIdRef,
    activeChatId,
    threadLoadMoreButtonRef,
    refetchRequests,
    setValue
  );

  // Intersection Observer for Requests
  useIntersectionObserver({
    target: requestLoadMoreButtonRef,
    onIntersect: () => {
      fetchNextPage();
    },
    enabled: requests?.pages?.flat()?.[0]?._id ? requestHasNextPage : false,
  });

  // To fetch profie photos of all the chat senders
  useProfilePhotos(user, requests);

  // Fetch admin data for patient when no one is assigned to the request
  const { data: adminUser } = useAdminData({
    enabled: Boolean(activeChat),
  });
 
  React.useEffect(() => { 
    if (process.env.REACT_APP_IS_SUBSCRIPTION == "true" && user?.model != "patients") {
      getSubscription(user?._id, user?.model)
        .then(items => {
          if(items != null && items.message == "Success!") {
            setTrialGet(true);
            if (new Date(items.data.endDate) < new Date()) {
              setSubscriptionModalVisible(true);
            }
          } else {
            setSubscriptionModalVisible(true);
          }
        });
      } else {
        if (user?.model != "patients") {
          setSubscriptionModalVisible(true);  
        }
        else {
          setSubscriptionModalVisible(false);
        }
      }
    let _activeChatId =
      // ?.filter((request) => request.assignedTo)
      id && requests?.pages?.flat()?.find((request) => request._id === id)
        ? id
        : requests?.pages?.flat()?.[0]?._id;
    setActiveChatId(_activeChatId);
    activeChatIdRef.current = _activeChatId;
    setActiveChat(
      requests?.pages?.flat()?.find((request) => request._id === _activeChatId)
    );
    setAppoint(
      user?.model === "dentists" ? "hidden" : "visible"
    );
  }, [id, requests]);

  return (
    <>
      <Header />
      <div className="d-menu" style={{marginTop: "80px"}}>
        <ul className="list-inline">
          <li className="order-1">
            <a className="active" href="javascript:void(0)">
              <i className="fa fa-envelope"></i>Messages
            </a>
          </li>
          {/* <li className="order-2" onClick={showModal}>
            <a href="javascript:void(0)">
              <i className="fa fa-question-circle"></i>How Teledental works?{" "}
            </a>
          </li> */}
          <li className="order-2" onClick={showModalAppoinments} style={{visibility: apoint}}>
            <a href="javascript:void(0)">
              <i className="fa fa-handshake-o"></i>My Appointments{" "}
            </a>
          </li>
        </ul>
      </div>

      <div className={`d-flex justify-content-center cstm_chatBoxContent`}>
        <div
          style={{
            margin: "15px 15px 0 15px",
            flex: 1,
            overflow: "hidden",
          }}
          // className={`d-flex flex-column justify-content-center messageComponentParentDiv`}
          className={`d-flex flex-column justify-content-center`}
        >
          {/* <Title level={3}>Messages</Title> */}

          {isLoading ? (
            <Row
              style={{
                height: "70vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin />
            </Row>
          ) : (
            <Row
              gutter={[5, 5]}
              style={{
                marginBottom: "16px",
                flex: 1,
                width: "100%",
                overflow: "hidden",
              }}
              className={`d-flex flex-column flex-lg-row inbox`}
            >
              {/* CHAT HEADS */}
              {/* <Col span={8} className={`messageThreadSelectorParent`}> */}
              <Col
                className={`messageThreadSelectorParent ${
                  isChatHeadClicked ? "d-none d-lg-flex" : "d-flex"
                }`}
              >
                <ChatHeads
                  requests={requests}
                  activeChatId={activeChatId}
                  queryClient={queryClient}
                  adminUser={adminUser}
                  loadMoreButtonRef={requestLoadMoreButtonRef}
                  hasNextPage={requestHasNextPage}
                  setIsChatHeadClicked={setIsChatHeadClicked}
                />
              </Col>
              {/* MESSAGES */}
              <Col
                span={16}
                style={{
                  // display: "flex",
                  display: "none",
                  flexDirection: "column",
                  flex: 1,
                  // overflow: "hidden",
                }}
                className={`messageChatParent  ${
                  isChatHeadClicked ? "d-flex" : "d-none d-lg-flex"
                }`}
              >
                <ChatCard
                  messages={messages}
                  sendMessage={sendMessage}
                  sendAttachment={sendAttachment}
                  uploadAttachmentLoading={uploadAttachmentLoading}
                  acceptRequest={acceptRequest}
                  rejectRequest={rejectRequest}
                  messageInputRef={messageInputRef}
                  areMessagesLoading={areMessagesLoading}
                  activeChat={activeChat}
                  adminUser={adminUser}
                  loadMoreButtonRef={threadLoadMoreButtonRef}
                  hasNextPage={threadHasNextPage}
                  queryClient={queryClient}
                  setIsChatHeadClicked={setIsChatHeadClicked}
                  setValue={setValue}
                />
              </Col>
            </Row>
          )}
        </div>
      </div>

      <HowChatWorksModal
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
      />

      <Subscription
          isModalVisible={isSubscriptionModalVisible}
          setIsModalVisible={setSubscriptionModalVisible}
          isTrialGet={isTrialGet}
        />
    </>
  );
}
