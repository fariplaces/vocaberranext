"use client";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const { formData, errors, loading, router, handleChange, handleLogin } =
    useLogin();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="text"
              className={`w-full p-3 mt-1 rounded-xl bg-gray-800 border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        {/* Extra Links */}
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <button className="hover:text-blue-400 transition">
            Forgot Password?
          </button>
          <button
            onClick={() => router.push("/auth/register")}
            className="hover:text-blue-400 transition"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
