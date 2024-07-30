import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
// import { loginUser } from "@/store/userSlice";
import { loginUser } from "../store/userSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("- - - - - - - - - - ");
    console.log("Started submitForm() in LoginPage.jsx");
    try {
      console.log("Trying to dispatch action");
      const resultAction = await dispatch(
        loginUser({ email, password }),
      ).unwrap();
      console.log("Result: ", resultAction);
      toast({
        description: resultAction.message,
      });

      if (resultAction.success) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log("Error occurred in submitForm() in LoginPage.jsx");
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "An unknown error occured",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <main className="flex flex-grow flex-col items-center justify-center p-2">
        {/* Login Form */}
        <div className="flex w-full flex-col border border-black md:w-2/3 md:flex-row">
          <section className="flex flex-col items-center justify-center bg-[#272e3f] p-10 text-lg font-black text-white md:w-1/2 md:text-4xl">
            Welcome Back
          </section>
          <section className="p-10 md:w-1/2">
            <p className="mb-2 text-3xl font-bold">Login</p>
            <p className="my-6 text-sm text-[#999999]">
              Welcome back! Please login to your account
            </p>
            <form>
              <div>
                <Label className="my-2 text-[#999999]" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="my-2"
                  type="email"
                  id="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <Label className="my-2 text-[#999999]" htmlFor="password">
                  Password
                </Label>
                <Input
                  className="my-2"
                  type="password"
                  id="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button onClick={submitForm} className="my-6 w-full">
                Login
              </Button>
            </form>
            <p>
              <span className="text-[#999999]">New User?</span>{" "}
              <Link className="" to={"/signup"}>
                Sign up
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
