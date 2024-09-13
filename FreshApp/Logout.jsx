import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  // useContext to Set Global State

  const userLoggedData = useContext(AuthContext);

  //Navigate OBJ

  const navigate = useNavigate();

  //Handling Logout

  function logout() {
    //Remove Token in LocalStorage
    localStorage.removeItem("nutrify-token");
    //Globally stored variable using Context
    userLoggedData.setUserLoggedIn(null);

    //Navigate the track Component by Clicking Login Button

    navigate("/login");
  }

  return (
    <>
      <div className="logout">
        <ul type="none">
          <li onClick={logout}>Logout</li>
        </ul>
      </div>
    </>
  );
}
