import React from "react";
import useAxiosSecure from "../../CustomHooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ProfileCard from "./Components/ProfileCard";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const BranchesList = () => {
  const axiosSecure = useAxiosSecure();
  const {
    isPending,
    isError,
    data: allBranches,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["allBranches"],
    queryFn: async () => {
      const result = await axiosSecure.get("/allBranches");
      return result.data
    },
  });
  if (isPending) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  if (isLoading) {
    return <span>Loading ...</span>;
  }
  console.log(allBranches);
  const acceptedBranches = allBranches.filter(branch=>branch.status === 'accepted')
  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 p-6">
        <div className="flex items-center justify-center text-3xl font-bold text-blue-300">      
      BranchesList
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {acceptedBranches.map((user,index) => (
          <ProfileCard user={user} key={index}></ProfileCard>
        ))}
      </div>
    </div>
  );
};

export default BranchesList;
