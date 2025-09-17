"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "@/app/styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";

type Props = {
  setRoute: (route: string) => void;
};
const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("Please enter your password!"),
});
const SignUp: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [register,{data,error,isSuccess}] = useRegisterMutation();

  useEffect(()=>{
    if(isSuccess){
      const message = data?.message || "Registration successful!";
      toast.success(message);
      setRoute("Verification");
    }
    if(error){
      if('data' in error){
        const errorData = error as any;
        toast.error(errorData.data.message )
      }
    }
  },[isSuccess,error]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({name, email, password }) => {
     const data={
      name,
      email,
      password
     }
     await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Join NextLearn</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className={`${styles.label}`} htmlFor="name">
            {" "}
            Enter your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={values.name}
            placeholder="John Doe"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            }`}
            onChange={handleChange}
          />
          {errors.name && touched.name && (
            <div className="text-red-500 pt-2 block">{errors.name}</div>
          )}
        </div>
        <label className={`${styles.label}`} htmlFor="email">
          {" "}
          Enter your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          placeholder="loginmail@example.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
          onChange={handleChange}
        />
        {errors.email && touched.email && (
          <div className="text-red-500 pt-2 block">{errors.email}</div>
        )}

        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            {" "}
            Enter your password
          </label>
          <input
            type={show ? "text" : "password"}
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            placeholder="password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />

          <button type="button" onClick={() => setShow(!show)}>
            {show ? (
              <AiOutlineEyeInvisible className="absolute bottom-3 right-2 z-1 cursor-pointer" />
            ) : (
              <AiOutlineEye className="absolute bottom-3 right-2 z-1 cursor-pointer" />
            )}
          </button>
        </div>
        {errors.password && touched.password && (
          <div className="text-red-500 pt-2 block">{errors.password}</div>
        )}
        <div className="w-full mt-5">
          <input type="submit" value="Sign Up" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
      </form>
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Already have an account?{" "}
        <span
          className="text-blue-500 pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign In
        </span>
      </h5>
    </div>
  );
};

export default SignUp;
