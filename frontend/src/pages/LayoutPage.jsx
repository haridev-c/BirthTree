import Navbar from "@/components/navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

function LayoutPage() {
  return (
    <>
      <main className="flex min-h-screen flex-col p-2">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
}

export default LayoutPage;
