import React, { useState } from "react";
import { Eye, EyeOff, Youtube } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true
      setError(""); // Clear any previous errors
      const response = await axios.post("http://localhost:8000/api/user/signin", {
        email,
        password,
      }, { withCredentials: true });
      if(response.data.success){
        dispatch(setUser(response.data.user)); // Set user in redux
        navigate("/"); // Navigate to home page
      }else{
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-card p-8 rounded-lg shadow-md border border-border w-full max-w-md">
        <div className="flex justify-center items-center mb-6">
          <Youtube className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold ml-2 text-black dark:text-white">
            YouTube
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-foreground">
          Sign in
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-1"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-input text-foreground pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full  py-2 px-4 rounded-md  transition duration-300"
            disabled={loading}
          >
            {loading? "Loading..." : "Sign In"}
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-primary hover:underline">
            Forgot password?
          </a>
        </div>
        <div className="mt-6 text-center">
            <p className="text-foreground">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
