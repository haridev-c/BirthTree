import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersThunk } from "../../store/allUsersSlice";
import { useToast } from "../ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const formatAmount = (num) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  if (status === "fetching") {
    return null;
  }

  return (
    <section>
      <p className="text-center">Leaderboard</p>
      {users ? (
        // users.map((user) => <p>{user.name}</p>)
        <Table className="m-auto md:w-1/2">
          <TableCaption>Leaderboard of top donors</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-right">
                  {formatAmount(user.totalDonation)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No users to display</p>
      )}
    </section>
  );
}

export default Leaderboard;
