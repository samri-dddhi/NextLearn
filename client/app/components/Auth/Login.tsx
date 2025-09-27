'use client'
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
import { useUserLoggedInMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react"

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};
const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("Please enter your password!"),
});
const Login: FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useUserLoggedInMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login successful!");
      setOpen(false);
      // Handle successful login
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
      // Handle login error
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login with NextLearn</h1>
      <form onSubmit={handleSubmit}>
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
          {errors.password && touched.password && (
            <div className="text-red-500 pt-2 block">{errors.password}</div>
          )}
          <button type="button" onClick={() => setShow(!show)}>
            {show ? (
              <AiOutlineEyeInvisible className="absolute bottom-3 right-2 z-1 cursor-pointer" />
            ) : (
              <AiOutlineEye className="absolute bottom-3 right-2 z-1 cursor-pointer" />
            )}
          </button>
        </div>
        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" onClick={() => signIn("google")}/>
          <AiFillGithub size={30} className="cursor-pointer ml-2" onClick={() => signIn("github")}/>
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Don't have an account?{" "}
          <span
            className="text-blue-500 pl-1 cursor-pointer"
            onClick={() => setRoute("Sign-Up")}
          >
            Sign up
          </span>
        </h5>
      </form>
    </div>
  );
};

export default Login;
