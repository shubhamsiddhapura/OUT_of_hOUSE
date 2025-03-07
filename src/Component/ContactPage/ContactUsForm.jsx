import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiconnector";
import { contactusEndpoint } from "../../services/apis";


const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log("Logging Data", data);
    try {
      setLoading(true);
      const response = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );
      console.log("Logging response", response);
      setLoading(false);
    } catch (error) {
      console.log("Error", error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <div>
      <form onSubmit={handleSubmit(submitContactForm)} className="flex flex-col gap-7">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <lable htmlFor="firstname">First Name</lable>
            <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              {...register("firstname", { required: true })}
              className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
            {errors.firstname && <span className="-mt-1 text-[12px] text-yellow-100">Please enter your name.</span>}
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <lable htmlFor="lastname">Last Name</lable>
            <input
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Enter last name"
              {...register("lastname")}
              className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <lable htmlFor="email">Email Address</lable>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            {...register("email", { required: true })}
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
          />
          {errors.email && <span className="-mt-1 text-[12px] text-yellow-100">Please enter your Email address</span>}
        </div>
      
        <div className="flex flex-col gap-2">
          <lable htmlFor="message">Message</lable>
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={7}
            placeholder="Enter your message here"
            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            {...register("message", { required: true })}
          />
          {errors.message && <span className="-mt-1 text-[12px] text-yellow-100">Please enter your Message</span>}
        </div>
        <button
          disabled={loading}
          type="submit"
          className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]  ${
            !loading && "transition-all duration-200 hover:scale-95 hover:shadow-none"
          } disabled:bg-richblack-500 sm:text-[16px] `}
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;
