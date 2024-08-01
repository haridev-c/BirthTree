import Leaderboard from "@/components/leaderboard/Leaderboard";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
  const { userDetails } = useSelector((state) => state.user);
  console.log(userDetails);

  return (
    <>
      <main>
        <div>HomePage</div>
        <p>Welcome </p>
        <Leaderboard />
      </main>
    </>
  );
}

export default HomePage;
