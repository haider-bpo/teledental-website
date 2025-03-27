import { useQuery } from "react-query";
import { getAdminProfile } from "../Commons/apis/commonV1";
import { useProfilePhoto } from "./useProfilePhoto";

export default function useAdminData({ enabled }) {
  const { data, isLoading, refetch } = useQuery(
    "admin",
    async () => {
      const res = await getAdminProfile();
      return res.data;
    },
    {
      enabled,
      staleTime: Infinity,
    }
  );

  useProfilePhoto(data);

  return { data, isLoading, refetch };
}
