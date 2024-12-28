import { useGetUserByEmailQuery } from "@/redux/features/user/userApi";
import useCurrentUserInfo from "./useCurrentUserInfo";

const useCurrentUserInfoData = () => {
  const { email } = useCurrentUserInfo();
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch,
  } = useGetUserByEmailQuery(email);

  const user = userData?.data || {};

  return { user, isUserLoading, refetch };
};

export default useCurrentUserInfoData;
