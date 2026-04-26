"use client";
import { checkAuth } from "@/store/actions/authActions";
import { selectAuthMetaData } from "@/store/selectors/authSelectors";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();

  // Local state to ensure we don't show children until the first check is DONE
  const [isInitialized, setIsInitialized] = useState(false);

  const { isAuthenticated, loading } = useSelector(selectAuthMetaData);

  const isPublicRoute = ["/auth/login", "/auth/register"].includes(pathName);

  // 1. Run the check only ONCE on mount
  useEffect(() => {
    dispatch(checkAuth()).finally(() => setIsInitialized(true));
  }, [dispatch]);

  // 2. Handle Redirects logic
  useEffect(() => {
    if (loading || !isInitialized) return;

    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/auth/login");
    } else if (isAuthenticated && isPublicRoute) {
      router.replace("/");
    }
  }, [isAuthenticated, loading, isPublicRoute, router, isInitialized]);

  // 3. The "Anti-Flash" Logic
  // Show a dark-themed spinner while validating the session
  if (loading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500" />
      </div>
    );
  }

  // 4. Prevent content leak during the redirect process
  if (!isAuthenticated && !isPublicRoute) return null;
  if (isAuthenticated && isPublicRoute) return null;

  return <>{children}</>;
};

export default AuthCheck;