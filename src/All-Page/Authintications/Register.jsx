import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
import useAuth from "./../../CustomHooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../CustomHooks/useAxios";

export default function Register() {
  const { createUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  // ✅ Form Submit
  const onSubmit = async (data) => {
    try {
      console.clear();

      // Firebase Auth Register
      await createUser(data.email, data.password);

      // File গুলোকে শুধু নাম হিসেবে দেখানো
      const displayData = {
        ...data,
        directorPhoto: data.directorPhoto?.[0]?.name || "",
        institutePhoto: data.institutePhoto?.[0]?.name || "",
        nationalIdPhoto: data.nationalIdPhoto?.[0]?.name || "",
        signaturePhoto: data.signaturePhoto?.[0]?.name || "",
      };

      console.log("REGISTER_FORM_SUBMIT", displayData);

      axiosSecure
        .post("/addUserInfo", displayData)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Registration Successful",
            text: "Your registration form has been submitted!",
            confirmButtonColor: "#4f46e5",
          });
        })
        .catch(() => console.log("no data"));

      // reset(); // form clear
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message || "Something went wrong!",
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 min-h-screen  flex items-center justify-center p-10">
      <div className="w-full max-w-6xl">
        <div className="relative rounded-2xl px-10 py-10 shadow-lg hover:shadow-indigo-500/70 transition bg-gray-800 bg-opacity-80 backdrop-blur-sm p-8 border border-gray-700">
          <h1 className="text-2xl font-bold text-gray-100 text-center">
            Branch Registration
          </h1>
          <p className="text-sm text-gray-400 text-center mt-1">
            Fill the form below to register
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {/* Text Inputs */}
            {[
              { id: "instituteName", label: "Institute Name" },
              { id: "directorName", label: "Director Name" },
              { id: "fatherName", label: "Father's Name" },
              { id: "motherName", label: "Mother's Name" },
              { id: "email", label: "Email", type: "email" },
              { id: "mobileNumber", label: "Mobile Number" },
              { id: "address", label: "Address" },
              { id: "postOffice", label: "Post Office" },
              { id: "upazila", label: "Upazila" },
              { id: "district", label: "District" },
              { id: "username", label: "Username" },
              { id: "password", label: "Password", type: "password" },
            ].map((field) => (
              <div key={field.id} className="tytry-span-1">
                <label className="block text-sm text-gray-300 mb-1">
                  {field.label}
                </label>
                <input
                  type={field.type || "text"}
                  placeholder={field.label}
                  {...register(field.id, {
                    required: "This field is required",
                  })}
                  className={`w-full rounded-xl bg-gray-900 text-gray-100 border px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition ${
                    errors[field.id] ? "border-pink-500" : "border-gray-700"
                  }`}
                />
                {errors[field.id] && (
                  <p className="mt-1 text-xs text-pink-400">
                    {errors[field.id]?.message}
                  </p>
                )}
              </div>
            ))}

            {/* File Inputs */}
            {[
              { id: "directorPhoto", label: "Director Photo" },
              { id: "institutePhoto", label: "Institute Photo" },
              { id: "nationalIdPhoto", label: "National ID Photo" },
              { id: "signaturePhoto", label: "Signature Photo" },
            ].map((file) => (
              <div key={file.id} className="col-span-1">
                <label className="block text-sm text-gray-300 mb-1">
                  {file.label}
                </label>
                <input
                  type="file"
                  {...register(file.id, { required: "This field is required" })}
                  className={`w-full text-sm text-gray-300 border rounded-xl px-3 py-2 bg-gray-900 cursor-pointer
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-600 file:text-gray-100
                    hover:file:bg-indigo-700 transition-colors
                    ${errors[file.id] ? "border-pink-500" : "border-gray-700"}`}
                />
                {errors[file.id] && (
                  <p className="mt-1 text-xs text-pink-400">
                    {errors[file.id]?.message}
                  </p>
                )}
              </div>
            ))}

            {/* Submit Button */}
            <div className="col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 transition"
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <NavLink to="/Login" className="text-indigo-400 hover:underline">
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}