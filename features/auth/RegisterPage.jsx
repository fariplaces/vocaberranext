"use client";
import { useRegister } from "@/hooks/useRegister";

export default function RegisterPage() {
  const { formData, errors, loading, router, handleChange, handleRegister } =
    useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Welcome For Registration 👋
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-300">Name</label>
            <input
              type="text"
              className={`w-full p-3 mt-1 rounded-xl bg-gray-800 border ${
                errors.userName ? "border-red-500" : "border-gray-600"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your Name.."
              disabled={loading}
            />
            {errors.userName && (
              <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300">Email</label>
            <input
              type="email"
              className={`w-full p-3 mt-1 rounded-xl bg-gray-800 border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              disabled={loading}
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
              } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              disabled={loading}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-blue-800 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } transition duration-300 text-white font-semibold py-3 rounded-xl shadow-lg mt-2`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <button
            onClick={() => router.push("/auth/login")}
            className="hover:text-blue-400 transition"
          >
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
}
