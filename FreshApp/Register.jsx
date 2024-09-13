import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
  });

  const [message, setMessage] = useState({
    type: "hiddenMsg",
    text: "DummyMsg",
  });

  //Handling Input Field

  function handleInput(event) {
    setUserDetails((prevOBJ) => {
      
      return { 
        ...prevOBJ, [event.target.name]: event.target.value };
    });
  }

  //Handling Submit

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(userDetails);

    //Fetching API

    fetch("http://localhost:8000/register", {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMessage({ type: "success", text: data.message });

        //Reset the Default Empty Value

        setUserDetails({
          name: "",
          email: "",
          password: "",
          age: "",
        });

        //SetTimeout the Message

        setTimeout(() => {
          setMessage({ type: "hiddenMsg", text: "DummyMsg" });
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
            type="name"
            name="name"
            onChange={handleInput}
            placeholder="Enter Name"
            maxLength={20}
            value={userDetails.name}
            required
          />
          <input
            className="inp-form"
            type="email"
            name="email"
            onChange={handleInput}
            placeholder="Enter Email"
            // pattern="/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/"
            value={userDetails.email}
            required
          />
          <input
            className="inp-form"
            type="password"
            name="password"
            onChange={handleInput}
            placeholder="Enter Password"
            maxLength={8}
            value={userDetails.password}
            required
          />
          <input
            className="inp-form"
            type="number"
            name="age"
            onChange={handleInput}
            placeholder="Enter Age"
            minLength={12}
            maxLength={200}
            value={userDetails.age}
            required
          />

          <button className="btn">Join</button>

          <p>
            Already have an account ? <Link to="/login">Login</Link>
          </p>
          <p className={message.type}>{message.text}</p>
        </form>
      </section>
    </>
  );
}
