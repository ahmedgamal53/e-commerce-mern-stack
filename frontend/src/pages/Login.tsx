import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler=async (e: { preventDefault: () => void; })=>{
    e.preventDefault()
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-3xl font-medium tracking-wide">
            Welcome Back
          </p>

          <p className="text-gray-500 text-sm mt-2">
            Sign in to continue shopping with us
          </p>
        </div>

        {/* Card */}
        <div className="border border-gray-200 rounded-2xl p-7 sm:p-9 shadow-sm bg-white">

          <form 
          onSubmit={onSubmitHandler}
          className="flex flex-col gap-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full px-4 py-3
                  border border-gray-300
                  rounded-lg
                  outline-none
                  transition
                  focus:border-black
                  focus:ring-1 focus:ring-black
                  placeholder:text-gray-400
                "
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-gray-500 hover:text-black hover:underline transition"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="
                    w-full px-4 py-3 pr-12
                    border border-gray-300
                    rounded-lg
                    outline-none
                    transition
                    focus:border-black
                    focus:ring-1 focus:ring-black
                    placeholder:text-gray-400
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="
                    absolute right-4 top-1/2
                    -translate-y-1/2
                    text-gray-500
                    hover:text-black
                    text-sm
                  "
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>



            {/* Button */}
            <button
              type="submit"
              className="
                w-full
                bg-black
                text-white
                py-3
                rounded-lg
                font-medium
                tracking-wide
                hover:bg-gray-800
                active:scale-[0.99]
                transition
                mt-2
              "
            >
              Sign In
            </button>

          </form>
        
          {/* Sign Up */}
          <p className="text-center text-sm text-gray-500 mt-7">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-black font-medium hover:underline"
            >
              Create an account
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login