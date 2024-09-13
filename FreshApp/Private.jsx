import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function Private(props) {
  // useContext to Set Global State

  const userLoggedData = useContext(AuthContext);
  // console.log(userLoggedData.userLoggedIn);

  return (
    //Return Ternanry Operator

    userLoggedData.userLoggedIn !== null ? (
      <props.component />
    ) : (
      <Navigate to="/login" />
    )
  );
}
