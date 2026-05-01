import { loginUser } from "@/store/actions/authActions";
import { selectAuthMetaData } from "@/store/selectors/authSelectors";
import { validateLogin } from "@/utils/validations/authValidation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error: apiError } = useSelector(selectAuthMetaData);

  const [formData, setFormData] = useState({
    email: process.env.NEXT_PUBLIC_DEFAULT_USER || "",
    password: process.env.NEXT_PUBLIC_DEFAULT_PASSWORD || "",
  });

  const [errors, setErrors] = useState({});

  // Handle API errors automatically
  useEffect(() => {
    if (apiError) toast.error(apiError, { id: "auth-toast" });
  }, [apiError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validateLogin(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await dispatch(loginUser(formData)).unwrap();
      toast.success("Welcome back!");
      router.push("/");
    } catch (err) {
      // API error is handled by the useEffect above
      // toast.error(`Login Failed: ${err}`)
      console.error("Login process failed ", err);
      // console.error(`Login Failed: ${err}`)
    }
  };

  return { formData, errors, loading, router, handleChange, handleLogin };
};