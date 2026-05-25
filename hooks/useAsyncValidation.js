import { useEffect, useState, useRef } from "react";
import axios from "axios";
import API from "@/config/apiConfig";
import toast from "react-hot-toast"; // 🌟 Import toast inside the hook

export const useAsyncValidation = ({
  value,
  excludeId,
  validationUrl,
  debounceTime = 500,
}) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isDebouncePending, setIsDebouncePending] = useState(false);

  // 🌟 GATEKEEPER REF: Tracks when an validation operation was actually active
  const wasCheckingRef = useRef(false);

  const isChecking = isDebouncePending || isValidating;

  useEffect(() => {
    // 1. Instantly clear states if field is structurally empty
    if (value === undefined || value === null || value === "") {
      setErrorMsg("");
      setIsValidating(false);
      setIsDebouncePending(false);
      wasCheckingRef.current = false;
      return;
    }

    setIsDebouncePending(true);
    setErrorMsg("");
    wasCheckingRef.current = true; // Set flag indicating a check has officially started

    const cancelTokenSource = axios.CancelToken.source();

    const delayDebounceFn = setTimeout(async () => {
      setIsDebouncePending(false);
      setIsValidating(true);

      try {
        const response = await API.get(validationUrl, {
          params: {
            order: value,
            excludeId: excludeId || "",
          },
          cancelToken: cancelTokenSource.token,
        });

        if (response.data?.exists) {
          setErrorMsg("This order sequence identifier is already assigned.");
        } else {
          setErrorMsg("");
        }
      } catch (error) {
        if (axios.isCancel(error)) return;
        setErrorMsg("Failed to complete remote uniqueness validation.");
      } finally {
        setIsValidating(false);
      }
    }, debounceTime);

    return () => {
      clearTimeout(delayDebounceFn);
      cancelTokenSource.cancel("Operation aborted due to newer input streams.");
    };
  }, [value, excludeId, validationUrl, debounceTime]);

  // 🌟 TOAST SIDE-EFFECT TRIGGER
  // Automatically watches the checking status and pushes notifications to the UI
  useEffect(() => {
    // If still checking, do nothing yet
    if (isChecking) return;

    // When checking flips from true to false, firing a definitive resolution
    if (wasCheckingRef.current && !isChecking) {
      wasCheckingRef.current = false; // Reset gatekeeper flag

      if (errorMsg) {
        toast.error(errorMsg, { id: "order-validation-toast" });
      } else if (value) {
        toast.success("Skill order number is available!", {
          id: "order-validation-toast",
        });
      }
    }
  }, [isChecking, errorMsg, value]);

  const isButtonDisabled =
    isChecking ||
    !!errorMsg ||
    value === "" ||
    value === undefined ||
    value === null;

  return {
    errorMsg,
    isChecking,
    isButtonDisabled,
  };
};
