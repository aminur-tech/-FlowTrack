import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Demo Credentials
  const demoEmail = "user1@example.com";
  const demoPassword = "password123";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError("The email or password you entered is incorrect.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Auto Fill Function
  const handleDemoFill = () => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-gray-50 dark:bg-[#0f172a] px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 rounded-3xl shadow-2xl border transition-all bg-white border-gray-100 dark:bg-[#1e293b] dark:border-slate-700/50">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">
            Please enter your details to access your account.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="animate-pulse bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md">
              <p className="text-sm text-red-700 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5 ml-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="appearance-none block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#059669] transition-all sm:text-sm bg-white border-gray-300 text-gray-900 dark:bg-[#0f172a] dark:border-slate-600 dark:text-white"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1.5 ml-1">
                Password
              </label>
              <input
                type="password"
                required
                className="appearance-none block w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#059669] transition-all sm:text-sm bg-white border-gray-300 text-gray-900 dark:bg-[#0f172a] dark:border-slate-600 dark:text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ✅ Demo Credential Button */}
            <button
              type="button"
              onClick={handleDemoFill}
              className="w-full text-sm font-semibold py-2 rounded-xl border border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
            >
              Use Demo Credentials
            </button>

          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`group relative w-full flex items-center justify-center gap-3 py-3.5 px-4 text-sm font-bold rounded-full text-white shadow-lg transition-all active:scale-95 ${
              isLoading 
              ? "bg-slate-400 cursor-not-allowed" 
              : "bg-gradient-to-r from-[#064e3b] via-[#065f46] to-[#14532d] hover:brightness-110"
            }`}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            ) : (
              "Sign In"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;