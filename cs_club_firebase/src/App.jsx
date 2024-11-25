import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { auth } from './firebase/firebase.jsx'
import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
// import {}

function App() {
  const [user, setUser] = useState("")
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [actualEmail, setActualEmail] = useState("");
  const [actualPassword, setActualPassword] = useState("");


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser){
        if (currentUser.displayName){
          setUser(currentUser.displayName);
        }
        else{
          setUser(currentUser.email);
        }
      }
      else setUser("");
    });
  }, []);

  

  const logOut = async () => {
    signOut(auth).then(() => {
      console.log("Sign out successful!");
      setUser("");
    }).catch((error) => {
      // An error happened.
      console.log("Error happened: " + error)
    });
  }  

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    // console.log(auth.currentUser);
    signInWithPopup(auth, provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential != null) {
          const token = credential.accessToken;
          const USER = result.user.displayName;
          // console.log(USER);
          setUser(USER);
          console.log(result.user.uid + " " + USER);
        }
        // The signed-in user info.
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("There is an error!");
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  const register = async () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log("Signed in");
    // ...
  })
  .catch((error) => {
    console.log("Error: " + error.message);
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  };

  
  const emailSignIn = async () => {
    signInWithEmailAndPassword(auth, actualEmail, actualPassword)
  .then((userCredential) => {
    // Signed in 
    // const user = userCredential.user;
    // setUser(userCredential);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  };
  return (
    <>
      <div>
        <Navbar bg="light" variant="light" sticky="top">
          <Container>
            <Navbar.Brand href="#home">Dhruv's Website :{")"}</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">{user || "Guest"}</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div className="content">
          <h1>Sign in with Google</h1>
          <button onClick={googleSignIn}>
            Log in w/ Google
          </button>
          {/* <p id="para1">{user !== "" ? user : "Not Logged In"}</p> */}
        </div>
        <h1>Or use email & password...</h1>
        <h1>Register</h1>
        <div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(event) => {
            setEmail(event.target.value);
          }} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label >Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(event) => {
            setPassword(event.target.value);
          }} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick = {register}>
        Register
      </Button>
      </div>
      <h1>Sign In</h1>
        <div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(event) => {
            setActualEmail(event.target.value);
          }} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label >Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(event) => {
            setActualPassword(event.target.value);
          }} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick = {emailSignIn}>
        Sign In
      </Button>
      </div>
        <button onClick = {logOut}>Sign Out</button>
      </div>
    </>
  );
}

export default App
