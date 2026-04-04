import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; // Framer motion for premium animations

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, navigate, backendUrl, setToken } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async (response) => {
    try {
      const res = await axios.post(backendUrl + "/api/user/google-login", {
        token: response.credential,
      });

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error("Google Login Failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Google Authentication Error");
    }
  };

  useEffect(() => {
    if (window.google && currentState !== "Verify OTP") {
      google.accounts.id.initialize({
        client_id: "614223157880-3iv0ualg0plvd69q1e4e5lk6saqbvck1.apps.googleusercontent.com",
        callback: handleGoogleLogin,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInBtn"),
        { theme: "outline", size: "large", width: "100%" } // Width adjusted for card
      );
    }
  }, [currentState]);

  const onSumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        if (password.length < 8) {
          toast.error("Password must be at least 8 characters long");
          setLoading(false);
          return;
        }
        const response = await axios.post(backendUrl + "/api/user/send-otp", {
          email,
        });

        if (response.data.success) {
          toast.success(response.data.message);
          setCurrentState("Verify OTP");
        } else {
          toast.error(response.data.message);
        }
      } else if (currentState === "Verify OTP") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
          otp,
        });

        if (response.data.success) {
          toast.success("Account created successfully!");
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  // Premium Input Styling (Underline Style)
  const inputStyle = "w-full px-2 py-3 bg-transparent border-b-2 border-gray-200 focus:border-[#C5A059] outline-none transition-colors duration-300 text-sm sm:text-base text-gray-800 placeholder-gray-400";

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-[#FAFAFA] py-10 px-4">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-[420px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 rounded-sm relative overflow-hidden"
      >
        {/* Luxury Top Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]"></div>

        <div className="p-8 sm:p-10">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#121212] mb-3">
              {currentState === "Verify OTP" ? "Verification" : currentState}
            </h2>
            <div className="w-12 h-[2px] bg-[#C5A059] rounded-full"></div>
            {currentState !== "Verify OTP" && (
              <p className="text-xs text-gray-400 mt-4 tracking-widest uppercase text-center">
                Access your premium account
              </p>
            )}
          </div>

          <form onSubmit={onSumbitHandler} className="flex flex-col gap-6">
            
            {/* Login & Sign Up Fields */}
            <AnimatePresence mode="wait">
              {currentState !== "Verify OTP" && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  <AnimatePresence>
                    {currentState === "Sign Up" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <input
                          className={inputStyle}
                          type="text"
                          placeholder="Full Name"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                          required
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <input
                    className={inputStyle}
                    type="email"
                    placeholder="Email Address"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />

                  <input
                    className={inputStyle}
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />

                  {/* Links (Forgot Password / Toggle State) */}
                  <div className="flex justify-between items-center text-xs sm:text-sm mt-2">
                    <p className="text-gray-500 cursor-pointer hover:text-[#C5A059] transition-colors">
                      Forgot Password?
                    </p>
                    {currentState === "Sign Up" ? (
                      <p onClick={() => setCurrentState("Login")} className="text-gray-500 cursor-pointer hover:text-[#121212] transition-colors font-semibold border-b border-transparent hover:border-[#121212]">
                        Login Here
                      </p>
                    ) : (
                      <p onClick={() => setCurrentState("Sign Up")} className="text-gray-500 cursor-pointer hover:text-[#121212] transition-colors font-semibold border-b border-transparent hover:border-[#121212]">
                        Create Account
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* OTP Verification Fields */}
            <AnimatePresence>
              {currentState === "Verify OTP" && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="w-16 h-16 bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-[#C5A059]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 mb-6 text-center leading-relaxed">
                    Enter the 6-digit security code sent to <br /> <span className="font-semibold text-[#121212]">{email}</span>
                  </p>
                  <input
                    className="w-full px-4 py-3 bg-[#FAFAFA] border border-gray-200 text-center tracking-[0.5em] text-xl font-bold rounded-sm outline-none focus:border-[#C5A059] transition-all"
                    type="text"
                    placeholder="------"
                    maxLength="6"
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                    required
                  />
                  <p
                    onClick={() => setCurrentState("Sign Up")}
                    className="text-xs text-gray-400 cursor-pointer mt-4 hover:text-[#121212] uppercase tracking-widest transition-colors border-b border-transparent hover:border-[#121212]"
                  >
                    Wrong Email? Go back
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Primary Submit Button */}
            <button
              disabled={loading}
              className={`group relative w-full h-12 mt-2 bg-[#121212] text-white text-xs sm:text-sm font-bold tracking-widest uppercase overflow-hidden transition-all duration-300 shadow-lg ${loading ? 'opacity-70 cursor-wait' : 'hover:shadow-[#C5A059]/20'}`}
            >
              {!loading && (
                <span className="absolute inset-0 bg-[#C5A059] translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"></span>
              )}
              <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300">
                {loading
                  ? "Processing..."
                  : currentState === "Verify OTP"
                    ? "Verify & Register"
                    : currentState}
              </span>
            </button>

            {/* Google Authentication Section */}
            {currentState !== "Verify OTP" && (
              <div className="mt-4 flex flex-col items-center w-full">
                <div className="flex items-center w-full gap-4 mb-6">
                  <div className="flex-1 h-[1px] bg-gray-200"></div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold">Or continue with</span>
                  <div className="flex-1 h-[1px] bg-gray-200"></div>
                </div>
                
                {/* Google Sign In Container */}
                <div className="w-full flex justify-center hover:scale-[1.02] transition-transform duration-300">
                  <div id="googleSignInBtn" className="w-full flex justify-center"></div>
                </div>
              </div>
            )}

          </form>
        </div>
      </motion.div>

    </div>
  );
};

export default Login;

