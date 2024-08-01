import Leaderboard from "@/components/leaderboard/Leaderboard";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const { userDetails } = useSelector((state) => state.user);
  console.log(userDetails);

  return (
    <>
      <main>
        <p className="my-8 text-center text-4xl">Welcome to BirthTree </p>
        <Leaderboard />
      </main>
    </>
  );
}

export default HomePage;
