import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Login() {
  //useContext to Set Global State

  const userLoggedData = useContext(AuthContext);
  // console.log(userLoggedData);

  //Navigate OBJ

  const navigate = useNavigate();

  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    email: "hiddenMsg",
    password: "Dummy",
  });

  //Handling Input Field

  function handleInput(event) {
    setUserCred((prevOBJ) => {
      return { ...prevOBJ, [event.target.name]: event.target.value };
    });
  }

  //Handling Submit

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(userCred);

    //Fetching API

    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify(userCred),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        //response Handling

        // console.log(response);
        if (response.status === 404) {
          setMessage({ type: "error", text: "Incorrect Email" });
        } else if (response.status === 401) {
          setMessage({ type: "error", text: "Incorrect Password" });
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data.token);

        //Token Undefined

        if (data.token !== undefined) {
          //Store Token in LocalStorage
          localStorage.setItem("nutrify-token", JSON.stringify(data));

          //Globally stored variable using Context
          userLoggedData.setUserLoggedIn(data);

          //Navigate the track Component by Clicking Login Button

          navigate("/track");
        } else {
          console.error(err);
        }

        //Reset the Default Empty Value

        setUserCred({
          email: "",
          password: "",
        });

        //SetTimeout the Message

        setTimeout(() => {
          setMessage({ email: "hiddenMsg", password: "Dummy" });
        }, 4000);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <section className="section">
        <form className="form" onSubmit={handleSubmit}>
          <h3>Start Your Fitness</h3>

          <input
            className="inp-form"
            type="email"
            name="email"
            onChange={handleInput}
            placeholder="Enter Email"
            value={userCred.email}
            required
          />
          <input
            className="inp-form"
            type="password"
            name="password"
            onChange={handleInput}
            placeholder="Enter Password"
            maxLength={8}
            value={userCred.password}
            required
          />

          <button className="btn">Login</button>

          <p>
            Not Registered ? <Link to="/register">Create an account</Link>
          </p>

          <p className={message.type}>{message.text}</p>
        </form>
      </section>
    </>
  );
}
