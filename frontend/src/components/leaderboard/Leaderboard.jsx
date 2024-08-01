import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersThunk } from "../../store/allUsersSlice";
import { useToast } from "../ui/use-toast";

function Leaderboard() {
  const { users, status } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const fetchAllUsers = async () => {
    try {
      const resultAction = dispatch(fetchAllUsersThunk()).unwrap();
    } catch (error) {
      console.log("Error in fetchAllUsers() in Leaderboard.jsx");
      console.error(error);
      toast({
        title: "Error",
        description: error.message || "An unknow error occured",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, [dispatch]);

  if (status === "fetching") {
    return null;
  }

  return (
    <section>
      <p>Leaderboard</p>
      {users ? (
        users.map((user) => <p>{user.name}</p>)
      ) : (
        <p>No users to display</p>
      )}
    </section>
  );
}

export default Leaderboard;
