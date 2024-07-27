import React, { useState } from "react";
import zxcvbn from "zxcvbn";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import DatePicker from "../components/DatePicker";
import PasswordMeter from "@/components/passwordMeter/PasswordMeter";

import { useToast } from "@/components/ui/use-toast";

function SignupPage() {
  const [dob, setDob] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passScore, setPassScore] = useState(0);
  const [passFeedback, setPassFeedback] = useState("");

  const { toast } = useToast();

  const checkPassStrength = (password) => {
    const result = zxcvbn(password);
    setPassScore(result.score);
    setPassFeedback(
      result.feedback.warning || result.feedback.suggestions[0] || "",
    );
    setPassword(password);
  };

  const isFormValid = () => {
    return name && email && dob && password && passScore > 2;
  };

  // Submit the form and handle errors
  const submitForm = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post("/users/create", {
        name,
        email,
        dob,
        password,
      });

      console.log(data);

      toast({
        description: data.message,
      });
    } catch (error) {
      console.log("Error in submitting form");
      console.error(error);

      if (error.response) {
        toast({
          description: error.response.data.message,
          variant: "destructive",
        });
      } else if (error.request) {
        console.error("No response received from server: ", error.request);
        toast({
          description: "No response from server. Please try again later",
          variant: "destructive",
        });
      } else {
        toast({
          description: "An unexpected error occured. Please try again later",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <main className="flex flex-grow flex-col items-center justify-center p-2">
        {/* Center content */}
        <div className="flex w-full flex-col border border-black md:w-2/3 md:flex-row">
          {/* Welcome message */}
          <section className="flex flex-col items-center justify-center bg-[#272e3f] p-10 text-lg font-black md:w-1/2 md:text-4xl">
            <span className="text-white">Join the family!</span>
          </section>

          {/* Signup Form */}
          <section className="p-10 md:w-1/2">
            <p className="mb-2 text-3xl font-bold">Register</p>
            <p className="my-6 text-sm text-[#999999]">
              {/* Welcome back! Please login to your account */}
            </p>
            <form>
              <div>
                <Label className="my-2 text-[#999999]" htmlFor="name">
                  Name
                </Label>
                <Input
                  className="my-2"
                  type="text"
                  id="name"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label className="my-2 text-[#999999]" htmlFor="email">
                  Email
                </Label>
                <Input
                  className="my-2"
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label className="my-2 text-[#999999]" htmlFor="dob">
                  Date of Birth
                </Label>
                <div className="my-2">
                  {/* <DatePicker date={dob} setDate={setDob} /> */}
                  <Input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="my-2 text-[#999999]" htmlFor="password">
                  Password
                </Label>
                <Input
                  className="mt-2"
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                  onChange={(e) => checkPassStrength(e.target.value)}
                />
                <PasswordMeter
                  passStrength={passScore}
                  feedback={passFeedback}
                />
              </div>

              <Button
                disabled={!isFormValid()}
                onClick={submitForm}
                className={`my-6 w-full`}
              >
                Register
              </Button>
            </form>
            <p>
              <span className="text-[#999999]">Existing User? </span>
              <Link className="" to={"/login"}>
                Login
              </Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default SignupPage;
