import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import DatePicker from "../components/DatePicker";

function SignupPage() {
  const [dob, setDob] = useState();
  return (
    <>
      <main className="flex flex-grow flex-col items-center justify-center p-2">
        {/* Center content */}
        <div className="flex w-full flex-col border border-black md:w-2/3 md:flex-row">
          {/*  */}
          <section className="flex flex-col items-center justify-center p-10 text-lg font-black md:w-1/2 md:text-4xl">
            Join the family!
          </section>

          {/* Signup Form */}
          <section className="bg-[#272e3f] p-10 md:w-1/2">
            <p className="mb-2 text-3xl font-bold text-white">Register</p>
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
                />
              </div>

              <div>
                <Label className="my-2 text-[#999999]" htmlFor="dob">
                  Date of Birth
                </Label>
                <div className="my-2">
                  <DatePicker date={dob} setDate={setDob} />
                </div>
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
                />
              </div>

              <Button variant="outline" className="my-6 w-full">
                Register
              </Button>
            </form>
            <p>
              <span className="text-[#999999]">Existing User?</span>
              <Link className="text-white" to={"/login"}>
                {" "}
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
