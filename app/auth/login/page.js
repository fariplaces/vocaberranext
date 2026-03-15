import AuthCheck from "@/components/AuthCheck";
import LoginPage from "@/components/Login";
import React from "react";

const SignIn = () => {
  return <AuthCheck><LoginPage /></AuthCheck>;
};

export default SignIn;
