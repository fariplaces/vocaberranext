"use client";
import { checkAuth } from "@/store/actions/authActions";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { isLoggedIn, loading } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (!loading) {
      if (!isLoggedIn && pathName !== "/auth/login") {
        router.push("/auth/login");
      } else if (isLoggedIn && pathName === "/auth/login") {
        router.push("/");
      }
    }
  }, [isLoggedIn, loading, pathName, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn && pathName !== "/auth/login") {
    return null;
  }

  if (loading) {
    return <div>Loading ....</div>;
  } else {
    return <>{children}</>;
  }
};

export default AuthCheck;
