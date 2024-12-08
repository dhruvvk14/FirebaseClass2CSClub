import { useState, useEffect } from 'react'
import './App.css'
import { auth , db} from './firebase/firebase.jsx'
import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { collection, doc, getDocs, query, setDoc, where, getDoc, onSnapshot } from "firebase/firestore";



function App() {
  const [name, setName] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser){
        if (currentUser.displayName){
          setName(currentUser.displayName);
        }
        else{
          setName(currentUser.email);
        }
      }
      else setName("");
    });
  }, []);

  const fetchData = async () => {
      // const querySnapshot = await getDocs(collection(db, "users")); // Replace "users" with your collection name
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
          console.log(doc.data().uid);
      });
    });
      
  };

  const logInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      setName(user.displayName);
      console.log(user.displayName);

      const usersRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(usersRef);

      if (!userSnap.exists()) {
        console.log("No such document!");
        //we now want to add a new entry to our database...
        await setDoc(usersRef, {
          email: user.email,
          name: user.displayName,
          uid : user.uid
        })
        
        console.log("Added new entry for user " + user.displayName);
      } else {
        console.log("Document already exists: ", userSnap.data());
      }
    } catch (error) {
      console.error("Error during sign-in:", error.message);
    }
  };

  const signOutOfAccount = async () => {
    signOut(auth).then(() => {
      setName("");
      console.log("Signed out successfully");
    }).catch((error) => {
      // An error happened.
    });
    
  }
  return (
    <>
      <button onClick = {logInWithGoogle}>Log in with google</button>
      <h1>{name != "" ? name : "Not signed in" }</h1>
      <button onClick = {signOutOfAccount}>Sign out</button>
      <button onClick = {fetchData}>Fetch Data</button>
    </>
  )
}

export default App
