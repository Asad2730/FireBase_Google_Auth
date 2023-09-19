import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";
import { Button } from "reactstrap";
import axios from "axios";
import UserData from "./userData";

function SignIn() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    age: 0,
  });


  const handleClick = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const userData = result.user;
        const { displayName, email, age } = userData;
        console.log('age IS', age)
        console.log('email IS', email)
        //const ag = (age === undefined || age === null) ? -1 : age;
        localStorage.setItem('age', age)

        setUser({ displayName, email, age });
        localStorage.setItem("email", email);
        // Send user data to your Express.js API
        axios
          .post("http://localhost:8090/api/addUser", {
            displayName,
            email,
          })
          .then((response) => {

            const { age } = response.data
            localStorage.setItem('age', age)
            console.log('age is', age)
            if (age !== undefined) {
              let { email } = response.data;
              localStorage.setItem("email", email);


            } else {
              let { email } = response.data;
              console.log("ok here is", email);
              localStorage.setItem("email", email);


            }
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


    const age = localStorage.getItem('age')

    console.log('age3', age)
    const emailFromLocalStorage = localStorage.getItem("email");
    console.log('email', emailFromLocalStorage)

    console.log('Condition1', Number.isInteger(user.age) && user.age === 0)
    console.log('Condition2', user.email !== "" && user.age > 0)
    console.log('Condition3', user.email !== "" && user.age > 0)

    // if (emailFromLocalStorage) 
    {
      setUser({
        email: emailFromLocalStorage,
        displayName: null,
        age: age,
      });
    }

    console.log('userAge', user.age)
    console.log('userEmail', user.email)

    console.log('Condition1', Number.isInteger(user.age) && user.age === 0)
    console.log('Condition2', user.email !== "" && user.age > 0)
    console.log('Condition3', user.email !== "" && user.age > 0)
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


      {
        Number.isInteger(user.age) && user.age === 0 ?
          <Button onClick={handleClick}>Sign in with Google</Button>

          : user.email !== "" && user.age === 0
            ?
            <Home />
            :
            <UserData />
      }


    </div>
  );
}

export default SignIn;
