"use client";
import { checkAuth } from "@/store/actions/authActions";
import { AUTH_KEYS } from "@/store/constants/authConstants";
import { selectAuthMetaData } from "@/store/selectors/authSelectors";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const { isAuthenticated: isLoggedIn, loading, user } = useSelector(selectAuthMetaData);
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
