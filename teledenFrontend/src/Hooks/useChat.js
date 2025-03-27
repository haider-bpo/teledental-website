import { updateCache } from "../utilities";
import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import * as React from "react";
import { useUserContext } from "../Context/userContext";
import { createSocketConnection } from "../socket";
import { getChatThread, uploadAttachment, SendEmailToReceiverAPI } from "../Commons/apis/commonV1";
import useIntersectionObserver from "./useIntersectionObserver";
import { v4 as uuidv4 } from "uuid";

export function useChat(
  messageInputRef,
  activeChat,
  activeChatIdRef,
  activeChatId,
  loadMoreButtonRef,
  refetchRequests,
  setValue
) {
  const queryClient = useQueryClient();
  const socketRef = React.useRef();
  const [isSend, setIsSend] = React.useState(false);
  const { user, token } = useUserContext();

  const {
    data: messages,
    isLoading: areMessagesLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["thread", activeChatId],
    async ({ pageParam = 0 }) => {
      const res = await getChatThread({
        id: activeChatId,
        queryParam: {
          limit: 20,
          cursor: pageParam === 0 ? undefined : pageParam,
        },
      });
      return res.data;
    },
    {
      enabled: Boolean(activeChatId),
      getNextPageParam: (lastPage, allPages) => {
        return allPages.length
          ? allPages?.[allPages?.length - 1]?.length === 20
            ? allPages?.[allPages?.length - 1][
                allPages?.[allPages?.length - 1].length - 1
              ]._id
            : undefined // To stop it from calling the api again
          : 0;
      },
    }
  );

  const {
    mutate: uploadAttachmentMutation,
    isLoading: uploadAttachmentLoading,
  } = useMutation(uploadAttachment);

  useIntersectionObserver({
    target: loadMoreButtonRef,
    onIntersect: () => {
      fetchNextPage();
    },
    enabled: messages?.pages?.[0]?.length ? hasNextPage : false,
  });

  // To create socket connection only once
  socketRef.current = React.useMemo(
    () => createSocketConnection({ token }),
    []
  );

  const isSendRef = React.useRef(isSend);
  React.useEffect(() => {
      isSendRef.current = isSend;
  }, [isSend]);

  React.useEffect(() => {
    socketRef.current.on("message", (data, other) => {
      if(isSendRef.current)
      {
        setIsSend((state) => !state);
        return;
      }
      setIsSend((state) => !state);
      // Make sure that the id you are getting here is latest one
      if (data.request === activeChatIdRef.current) {
        addMessageInCachedThread(
          ["thread", activeChatIdRef.current],
          queryClient,
          {
            _id: uuidv4(),
            message: data?.message,
            sender: data?.sender,
            type: data?.type,
          }
        );
      }
      // if the message belongs to some request which we haven't fetched yet (due to pagination) then fetch that request and set that too.
      updateLastMessage("requests", queryClient, {
        request: data?.request,
        message: data?.message,
        sender: data?.sender,
        type: data?.type,
      });
    });
    socketRef.current.on("request-accepted", (data) => {
      refetchRequests();
      refetchAcceptedThread(data.requestId, queryClient);
    });
    socketRef.current.on("new-request", (data) => {
      addNewRequest(data, queryClient);
    });
    socketRef.current.on("new-session", (data) => {
      setTimeout(() => {
        refetchRequests();
      }, 1500);
    });
  }, [queryClient]);

  async function SendEmailToReceiver(receiver, sender, requestTitle, message) {
    var data = {
      receiverId: receiver,
      senderId: sender,
      requestTitle: requestTitle,
      message: message
    }
    await SendEmailToReceiverAPI(data);
  }

  async function sendMessage() {
    if (!messageInputRef?.trim?.()) {
      return;
    }
    const message = {
      // To allow admin to send message on behalf of user
      sender:
        user.model === "dentists" && user.role === "admin"
          ? activeChat?.assignedTo._id
          : user._id,
      receiver:
        user.model === "dentists"
          ? activeChat?.patient._id
          : activeChat?.assignedTo._id,
      request: activeChat._id,
      message: messageInputRef,
      byAdmin:
        user.model === "dentists" && user.role === "admin" ? true : false,
    };
    socketRef.current.emit("message", message);
    addMessageInCachedThread(["thread", activeChat._id], queryClient, message);
    updateLastMessage("requests", queryClient, message);
    setValue('');
    await SendEmailToReceiver(message.receiver, message.sender, activeChat.title, message.message);
  }

  function sendAttachment(file) {
    const message = {
      // To allow admin to send message on behalf of user
      sender:
        user.model === "dentists" && user.role === "admin"
          ? activeChat?.assignedTo._id
          : user._id,
      receiver:
        user.model === "dentists"
          ? activeChat?.patient._id
          : activeChat?.assignedTo._id,
      request: activeChat._id,
      message: `IMAGE:LOCAL`,
    };
    const formData = new FormData();
    formData.append("image", file, file.name);
    debugger;
    uploadAttachmentMutation({
      id: activeChat._id,
      formData,
    });
    addMessageInCachedThread(["thread", activeChat._id], queryClient, {
      ...message,
      file,
    });
    updateLastMessage("requests", queryClient, {
      ...message,
      file,
    });
  }

  function acceptRequest() {
    const data = {
      patient: activeChat?.patient._id,
      requestId: activeChat._id,
    };
    socketRef.current.emit("request-accepted", data);
    refetchRequests();
    refetchAcceptedThread(data.request, queryClient);
    if (user.role === "admin") {
      queryClient.refetchQueries(["requestStatsAdmin", activeChat?._id], {
        exact: true,
      });
    }
  }

  function rejectRequest() {
    refetchRequests();
    refetchAcceptedThread(activeChat._id, queryClient);
  }

  return {
    sendMessage,
    sendAttachment,
    acceptRequest,
    rejectRequest,
    messages,
    areMessagesLoading,
    hasNextPage,
    uploadAttachmentLoading,
  };
}

function addMessageInCachedThread(queryKey, queryClient, message) {
  updateCache(queryKey, queryClient, function update(updatedThread) {
    updatedThread.pages[0] = [message, ...updatedThread.pages[0]];
    queryClient.setQueryData(queryKey, updatedThread);
  });
}
function updateLastMessage(
  queryKey,
  queryClient,
  { request, message, sender }
) {
  updateCache(queryKey, queryClient, function update(updatedRequests) {
    let requestIndex;
    let pageIndex;
    updatedRequests.pages.forEach((i, index) => {
      requestIndex = updatedRequests.pages[index].findIndex(
        (item) => item._id === request
      );
      if (requestIndex > -1) {
        pageIndex = index;
        return true;
      }
      return false;
    });
    if (requestIndex > -1) {
      updatedRequests.pages[pageIndex][requestIndex].lastMessage.message =
        message;
      updatedRequests.pages[pageIndex][requestIndex].lastMessage.sender =
        sender;
      updatedRequests.pages[pageIndex][requestIndex].lastMessage.createdAt =
        new Date();
    }
    queryClient.setQueryData(queryKey, updatedRequests);
  });
}
function addNewRequest(request, queryClient) {
  updateCache("requests", queryClient, function update(updatedRequests) {
    updatedRequests.pages[0] = [request, ...updatedRequests.pages[0]];
    queryClient.setQueryData("requests", updatedRequests);
  });
}
function refetchAcceptedThread(requestId, queryClient) {
  queryClient.refetchQueries(["thread", requestId], {
    exact: true,
  });
}
