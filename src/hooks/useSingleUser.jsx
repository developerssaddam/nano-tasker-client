import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSingleUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: singleUser, isPending } = useQuery({
    queryKey: ["user", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/singleuser?email=${user?.email}`);
      return res.data;
    },
  });

  return {singleUser, isPending};
};

export default useSingleUser;
