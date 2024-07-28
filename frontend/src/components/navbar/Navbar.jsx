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

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex h-14 w-full items-center rounded border border-black px-4">
        <div id="BrandDetails" className="mx-4 flex-grow">
          BirthTree
        </div>
        <div id="userDetails" className="">
          {isLoggedIn ? (
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
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-circle-user-round"
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
                    <Button
                      onClick={() => setIsLoggedIn(false)}
                      variant="destructive"
                    >
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
