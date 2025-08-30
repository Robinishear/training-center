import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../CustomHooks/useAxios";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import Swal from "sweetalert2";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const RequestedBranches = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const {
    isPending,
    isError,
    data: allBranches,
    error,
  } = useQuery({
    queryKey: ["allBranches"],
    queryFn: async () => {
      const result = await axiosSecure.get("/allBranches");
      return result.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (email) => {
      const response = await axiosSecure.post(`/approveBranch?email=${email}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBranches"] });
      Swal.fire({
        title: "Approved!",
        text: "Branch request accepted successfully.",
        icon: "success",
        background: "#1F2937",
        color: "#F3F4F6",
        confirmButtonColor: "#4F46E5",
      });
    },
    onError: (err) => {
      Swal.fire({
        title: "Error!",
        text: `Failed to approve branch. Error: ${err.message}`,
        icon: "error",
        background: "#1F2937",
        color: "#F3F4F6",
        confirmButtonColor: "#4F46E5",
      });
    },
    onSettled: () => {
      setIsApproving(false);
    },
  });

  const rejectMutation = useMutation({
    mutationFn: async (email) => {
      const response = await axiosSecure.post(`/rejectBranch?email=${email}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allBranches"] });
      Swal.fire({
        title: "Rejected!",
        text: "Branch request rejected successfully.",
        icon: "success",
        background: "#1F2937",
        color: "#F3F4F6",
        confirmButtonColor: "#EC4899",
      });
    },
    onError: (err) => {
      Swal.fire({
        title: "Error!",
        text: `Failed to reject branch. Error: ${err.message}`,
        icon: "error",
        background: "#1F2937",
        color: "#F3F4F6",
        confirmButtonColor: "#EC4899",
      });
    },
    onSettled: () => {
      setIsRejecting(false);
    },
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-900 min-h-screen-minus-header text-red-400">
        <FaTimesCircle className="text-4xl mr-3" />
        <p className="text-xl">Error: {error.message}</p>
      </div>
    );
  }

  const requestedBranches = allBranches.filter(
    (branch) => branch.status === "pending"
  );

  const handleApprove = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#EC4899",
      confirmButtonText: "Yes, Approve it!",
      background: "#1F2937",
      color: "#F3F4F6",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsApproving(true);
        approveMutation.mutate(email);
      }
    });
  };

  const handleReject = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently reject the request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EC4899",
      cancelButtonColor: "#4F46E5",
      confirmButtonText: "Yes, Reject it!",
      background: "#1F2937",
      color: "#F3F4F6",
    }).then((result) => {
      if (result.isConfirmed) {
        setIsRejecting(true);
        rejectMutation.mutate(email);
      }
    });
  };

  return (
    <div className="min-h-screen p-8 text-gray-100 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-400 drop-shadow-lg">
            User Approval Requests
          </h1>
        </motion.div>

        {requestedBranches.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="text-center text-gray-400 text-xl mt-20"
          >
            <p>No new user approval requests.</p>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants}>
            <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-xl backdrop-blur-sm bg-opacity-80">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Photo
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Institute Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Director Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      District
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {requestedBranches.map((user) => (
                    <motion.tr
                      key={user.email}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      className="hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={user.directorPhoto}
                          alt={`${user.directorName}'s photo`}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                        {user.instituteName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.directorName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {user.district}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => handleApprove(user.email)}
                          disabled={isApproving || isRejecting}
                          className="text-green-400 hover:text-green-600 transition-colors mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaCheckCircle className="inline-block text-xl" />
                        </button>
                        <button
                          onClick={() => handleReject(user.email)}
                          disabled={isApproving || isRejecting}
                          className="text-pink-400 hover:text-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaTimesCircle className="inline-block text-xl" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default RequestedBranches;