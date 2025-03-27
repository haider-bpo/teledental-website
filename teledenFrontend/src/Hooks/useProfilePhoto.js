import { useQueries, useQuery } from "react-query";
import { getImage } from "../Commons/apis/commonV1";

export function useProfilePhoto(user) {
  const { data: profilePhoto, refetch } = useQuery(
    ["profile-image", user?._id],
    async () => {
      const res = await getImage({ key: user?.profilePhoto });
      return res.data;
    },
    {
      enabled: Boolean(user?.profilePhoto),
      staleTime: Infinity,
      refetchInterval: 3500000,
    }
  );

  return { profilePhoto, refetch };
}

export function useProfilePhotos(user, requests) {
  const otherUserModel = user.model === "dentists" ? "patient" : "assignedTo";
  const photos = useQueries(
    requests?.pages[0]
      ? requests?.pages?.flat()?.map((item) => ({
          queryKey: ["profile-image", item?.[otherUserModel]?._id],
          queryFn: async () => {
            const res = await getImage({
              key: item?.[otherUserModel]?.profilePhoto,
            });
            return res.data;
          },
          enabled:
            Boolean(requests) && Boolean(item?.[otherUserModel]?.profilePhoto),
          staleTime: Infinity,
          refetchInterval: 3500000,
        }))
      : []
  );
  return { photos };
}

export function useMessageAttachment({ message, _id }) {
  const { data: image, refetch } = useQuery(
    ["message-image", _id],
    async () => {
      const res = await getImage({ key: message?.split?.(":")?.[1] });
      return res.data;
    },
    {
      enabled: Boolean(message?.split?.(":")?.[0] === "IMAGE"),
      staleTime: Infinity,
      refetchInterval: 3500000,
    }
  );

  return { image, refetch };
}

export function useMessagesAttachment(messages) {
  const photos = useQueries(
    messages?.pages[0]
      ? messages?.pages?.flat()?.map((item) => ({
          queryKey: ["message-image", item?._id],
          queryFn: async () => {
            const res = await getImage({
              key: item?.message?.split?.(":")?.[1],
            });
            return res.data;
          },
          enabled:
            Boolean(messages) &&
            Boolean(item?.message?.split?.(":")?.[0] === "IMAGE"),
          staleTime: Boolean(item?.message?.split?.(":")?.[0] === "IMAGE")
            ? Infinity
            : 0,
          refetchInterval: 3500000,
        }))
      : []
  );
  return { photos };
}
