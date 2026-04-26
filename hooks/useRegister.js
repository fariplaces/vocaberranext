import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { registerUser } from "@/store/actions/authActions";
import { selectAuthMetaData } from "@/store/selectors/authSelectors";
import { useRouter } from "next/navigation";
import { validateRegister } from "@/utils/authValidation";
import toast from "react-hot-toast";

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error: apiError } = useAppSelector(selectAuthMetaData);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Sync API errors to Toast
  useEffect(() => {
    if (apiError) toast.error(apiError, { id: "register-error" });
  }, [apiError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegister(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      toast.success("Account created! Welcome 👋");
      router.push("/");
    } catch (err) {
      // API error is handled by the useEffect above
      console.error("Registration flow failed:", err);
    }
  };

  return { formData, errors, loading, router, handleChange, handleRegister };
};