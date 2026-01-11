import { useState } from "react";
import { FaEye, FaEyeSlash, FaGithub, FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signupThunk } from "../../features/auth/authThunks";
import { validators, validate } from "../../utils/validators";
import { ROUTES } from "../../utils/constants";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", address: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { status, error } = useAppSelector((s) => s.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const v = validate(form, {
      name: validators.name,
      email: validators.email,
      address: validators.address,
      password: validators.password,
    });
    setErrors(v);
    if (Object.keys(v).length) return;
    const res = await dispatch(signupThunk(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate(ROUTES.STORES);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-2xl font-extrabold text-white">Review System</h1>
      </div>
      
     
      <div className="hidden lg:flex flex-col items-center justify-center w-3/5 bg-gradient-to-br from-blue-600 to-blue-800 p-12 text-white text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-4">Join us today!</h1>
          <p className="text-blue-100 text-lg mb-6">
            Create your account and start your journey with us.
          </p>
          
        </div>
        <div className="space-y-4">
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
          <p className="text-blue-200 text-sm">© 2026 Your Brand. All rights reserved.</p>
        </div>
      </div>

      
      <div className="w-full lg:w-2/5 flex flex-col justify-center p-8 sm:p-12 md:p-16">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 transition duration-200`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

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
                className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 transition duration-200`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-1">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 transition duration-200`}
                placeholder="Enter your address"
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
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
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className={`w-full px-4 py-3 pr-10 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300 focus:border-blue-500'} focus:ring-2 focus:ring-blue-200 transition duration-200`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
              {status === "loading" ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
