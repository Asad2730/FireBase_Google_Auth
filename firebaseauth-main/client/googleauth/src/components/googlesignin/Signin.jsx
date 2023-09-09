import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";
import { Button } from "reactstrap";
import axios from "axios";

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleClick = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const userData = result.user;
        const { displayName, email } = userData;
        setUser({ displayName, email });
        // Send user data to your Express.js API
        axios
          .post("http://localhost:8090/api/addUser", {
            displayName,
            email,
          })
          .then((response) => {
            console.log(response.data.message);
          })
          .catch((error) => {
            console.error("Error sending user data to API:", error);
          });
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };
  useEffect(() => {
    const emailFromLocalStorage = localStorage.getItem("email");
    if (emailFromLocalStorage) {
      setUser({
        email: emailFromLocalStorage,
        displayName: null,
      });
    }
    console.log(user);
    setUser("");
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: 500,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {user ? (
        <Home />
      ) : (
        <Button onClick={handleClick}>Sign in with Google</Button>
      )}
    </div>
  );
}
export default SignIn;
