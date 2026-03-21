"use client";
import { checkAuth } from "@/store/slices/authSlice";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// const AuthCheck = ({ children }) => {
//   const dispath = useDispatch();
//   const pathName = usePathname();
//   const { user, isLoggedIn, loading } = useSelector((state) => state.auth);
//   const router = useRouter();
//   console.log(user);

//   useEffect(() => {
//     dispath(checkAuth());
//   }, []);

//   useEffect(() => {
//     if (!loading && (!user || !isLoggedIn)) {
//       router.push("/auth/login");
//     }
//     // Logged in but on login page → redirect home

//     if (!loading && isLoggedIn && pathName === "/auth/login") {
//       router.push("/");
//     }
//   }, [user, loading, router]);
//   console.log(user);

//   if (loading) {
//     return <div>Loading ....</div>;
//   } else {
//     return <>{children}</>;
//   }
// };
// export default AuthCheck;
const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { user, isLoggedIn, loading } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    // Only redirect once loading is finished
    if (!loading) {
      if (!isLoggedIn && pathname !== "/auth/login") {
        router.push("/auth/login");
      } else if (isLoggedIn && pathname === "/auth/login") {
        router.push("/");
      }
    }
  }, [isLoggedIn, loading, pathname, router]);

  // Prevent "flash" of private content
  if (loading) {
    return <div>Loading...</div>;
  }

  // Only show children if logged in (or if on the login page)
  if (!isLoggedIn && pathname !== "/auth/login") {
    return null;
  }

  return <>{children}</>;
};

export default AuthCheck;
