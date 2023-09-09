import { useState } from "react";
import SignIn from "./components/googlesignin/Signin";

function App() {
  // const [user, setUser] = useState(null);
  // const addUserToFirestore = async (user) => {
  //   try {
  //     const userRef = firestore.collection("users").doc(user.uid);
  //     await userRef.set({
  //       displayName: user.displayName,
  //       email: user.email,
  //       // Add other user data as needed
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // React.useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((authUser) => {
  //     if (authUser) {
  //       setUser(authUser);
  //       addUserToFirestore(authUser); // Store user data in Firestore
  //     } else {
  //       setUser(null);
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  return (
    <>
      <SignIn />
    </>
    // <div>

    //   {user ? (
    //     <div>
    //       <p>Welcome, {user.displayName}</p>
    //     </div>
    //   ) : (
    //     <SignIn />
    //   )}
    // </div>
  );
}

export default App;
