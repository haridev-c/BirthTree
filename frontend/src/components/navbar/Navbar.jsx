import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import { useToast } from "../ui/use-toast";

function Navbar() {
  const { toast } = useToast();

  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logout()).unwrap();
      toast({
        description: resultAction.message,
      });
    } catch (error) {
      console.log("Error in logout() in Navbar.jsx");
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
      <nav className="flex h-14 w-full items-center rounded border border-black px-4">
        <div id="BrandDetails" className="mx-4 flex-grow">
          BirthTree
        </div>
        <div id="userDetails" className="">
          {userDetails ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-circle-user-round"
                      >
                        <path d="M18 20a6 6 0 0 0-12 0" />
                        <circle cx="12" cy="10" r="4" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex flex-col px-3 pb-2">
                  <DropdownMenuItem asChild>
                    <Button variant="outline" className="my-2">
                      Profile
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button onClick={handleLogout} variant="destructive">
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
