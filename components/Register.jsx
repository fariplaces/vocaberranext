"use client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { registerUser } from "@/store/slices/authSlice";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  // const handleLogin = () => {
  //   dispatch(loginUser({ email, password }));
  // };

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await dispatch(
          registerUser({ userName, email, password })
        ).unwrap();
        console.log("Login success:", response);

        // redirect to home after login success
        router.push("/");
      } catch (err) {
        console.error("Login failed:", err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome For Registration 👋
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300">Name</label>
            <input
              type="text"
              className={`w-full p-3 mt-1 rounded-xl bg-gray-800 border ${
                errors.userName ? "border-red-500" : "border-gray-600"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your Name.."
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="text"
              className={`w-full p-3 mt-1 rounded-xl bg-gray-800 border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300">Password</label>
            <input
              type="password"
              className={`w-full p-3 mt-1 rounded-xl bg-gray-800 border ${
                errors.password ? "border-red-500" : "border-gray-600"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Extra Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <a href="#" className="hover:text-blue-400 transition">
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
}
