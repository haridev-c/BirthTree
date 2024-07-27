import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

function LayoutPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col p-2">
        <Navbar />
        <Outlet />
        <Toaster />
      </main>
    </>
  );
}

export default LayoutPage;
