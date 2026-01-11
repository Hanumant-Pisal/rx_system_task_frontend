import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginThunk } from "../../features/auth/authThunks";
import { ROUTES } from "../../utils/constants";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { status, error } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    if (location.state?.from === 'signup') {
      setSuccessMessage(`Account created successfully!`);
      
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const submit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginThunk(form));
    if (res.meta.requestStatus === "fulfilled") {
      const role = res.payload.user.role;
      if (role === "admin") navigate(ROUTES.ADMIN_DASH);
      else if (role === "owner") navigate(ROUTES.OWNER_DASH);
      else navigate(ROUTES.STORES);
    }
  };

  return (
    <div className="min-h-screen flex">
     
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-2xl font-extrabold text-white">Review System</h1>
      </div>
      
      <div className="hidden lg:flex flex-col items-center justify-center w-3/5 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
          <p className="text-blue-100 text-lg">
            Sign in to continue your journey with us.
          </p>
        </div>
        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-center space-x-6">
            <a href="https://www.linkedin.com/in/hanumant-pisal-5111a2236/" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200">
              <span className="sr-only">LinkedIn</span>
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/software_engg96/" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200">
              <span className="sr-only">Instagram</span>
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://www.facebook.com/hanumant.pisal.79" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200">
              <span className="sr-only">Facebook</span>
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://github.com/Hanumant-Pisal" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors duration-200">
              <span className="sr-only">GitHub</span>
              <FaGithub className="h-6 w-6" />
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors duration-200">
              <span className="sr-only">Twitter</span>
              <FaTwitter className="h-6 w-6" />
            </a>
          </div>
          <p className="text-blue-200 text-sm"> 2026 Review System. All rights reserved.</p>
        </div>
      </div>

      
      <div className="w-full lg:w-2/5 flex flex-col justify-center p-8 sm:p-12 md:p-16">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in to your account</h1>
            <p className="text-gray-600">
              Or{" "}
              <Link to={ROUTES.SIGNUP} className="text-blue-600 hover:text-blue-800 font-medium">
                create a new account
              </Link>
            </p>
            {successMessage && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md text-green-700">
                {successMessage}
              </div>
            )}
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
               
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              {status === "loading" ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}