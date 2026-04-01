import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contexts/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, navigate, backendUrl, setToken } = useContext(ShopContext);
  
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // ⭐ NEW: OTP ke liye state
  const [loading, setLoading] = useState(false); // ⭐ NEW: Button loading state

  // ---------------- GOOGLE LOGIN CALLBACK ----------------
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

  // ---------------- GOOGLE BUTTON RENDER ----------------
  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: "614223157880-3iv0ualg0plvd69q1e4e5lk6saqbvck1.apps.googleusercontent.com", 
        callback: handleGoogleLogin,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInBtn"),
        { theme: "outline", size: "large", width: "350" }
      );
    }
  }, [currentState]); // currentState add kiya taake DOM change hone par dobara render ho

  // ---------------- MAIN SUBMIT HANDLER ----------------
 // ---------------- MAIN SUBMIT HANDLER ----------------
  const onSumbitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        
        // ⭐ THE FIX: OTP bhejne se pehle password ki length check karo!
        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long");
            setLoading(false);
            return; // Function ko yahin rok do, aage mat jao
        }

        // ⭐ STEP 1: SEND OTP
        const response = await axios.post(backendUrl + "/api/user/send-otp", {
          email,
        });
        
        if (response.data.success) {
          toast.success(response.data.message); 
          setCurrentState("Verify OTP"); 
        } else {
          toast.error(response.data.message);
        }
      } 
      
      else if (currentState === "Verify OTP") {
        // ⭐ STEP 2: VERIFY OTP & REGISTER
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
      } 
      
      else {
        // ⭐ NORMAL LOGIN
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
  }, [token]);

  return (
    <form
      onSubmit={onSumbitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">
          {currentState === "Verify OTP" ? "Verification" : currentState}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* ---------------- FIELDS FOR LOGIN & SIGNUP ---------------- */}
      {currentState !== "Verify OTP" && (
        <>
          {currentState === "Sign Up" && (
            <input
              className="w-full px-3 py-2 border border-gray-800"
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          )}

          <input
            className="w-full px-3 py-2 border border-gray-800"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <input
            className="w-full px-3 py-2 border border-gray-800"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer">Forgot Password?</p>
            {currentState === "Sign Up" ? (
              <p onClick={() => setCurrentState("Login")} className="cursor-pointer">
                Login Here
              </p>
            ) : (
              <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer">
                Create an account
              </p>
            )}
          </div>
        </>
      )}

      {/* ---------------- FIELDS FOR OTP VERIFICATION ---------------- */}
      {currentState === "Verify OTP" && (
        <div className="w-full flex flex-col items-center">
          <p className="text-sm text-gray-600 mb-4 text-center">
            Enter the 6-digit code sent to <br/> <span className="font-semibold">{email}</span>
          </p>
          <input
            className="w-full px-3 py-3 border border-gray-800 text-center tracking-[0.5em] text-xl font-bold rounded-sm"
            type="text"
            placeholder="------"
            maxLength="6"
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            required
          />
          <p 
            onClick={() => setCurrentState("Sign Up")} 
            className="text-sm text-blue-500 cursor-pointer mt-3 hover:underline"
          >
            Wrong Email? Go back
          </p>
        </div>
      )}

      {/* ---------------- SUBMIT BUTTON ---------------- */}
      <button 
        disabled={loading}
        className={`bg-black text-white font-light px-8 py-2 mt-4 border border-transparent transition-all duration-300 w-full sm:w-auto ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white hover:text-black hover:border-black'}`}
      >
        {loading 
          ? "Processing..." 
          : currentState === "Verify OTP" 
            ? "Verify & Register" 
            : currentState}
      </button>

      {/* ---------------- GOOGLE SIGN IN BUTTON ---------------- */}
      {/* Hide Google button during OTP verification to keep UI clean */}
      {currentState !== "Verify OTP" && (
        <div className="mt-4 w-full flex justify-center">
          <div id="googleSignInBtn"></div>
        </div>
      )}
    </form>
  );
};

export default Login;

