"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { removeNotification } from "@/store/slices/uiSlice";

export const GlobalToastProvider = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.ui.notifications);

  useEffect(() => {
    if (notifications.length > 0) {
      // Process all pending notifications
      notifications.forEach((n) => {
        if (n.type === "error") {
          toast.error(n.message);
        } else {
          toast.success(n.message);
        }

        // Remove from Redux immediately so it doesn't fire again
        dispatch(removeNotification(n.id));
      });
    }
  }, [notifications, dispatch]);

  return null; // Logic-only component
};