import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import {addDoc, collection, getFirestore} from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const firebaseConfig = {
  apiKey: "AIzaSyDgknvMxwpGsksPxQwznpsbbbza6Uqhuvc",
  authDomain: "netflix-clone-c2ec9.firebaseapp.com",
  projectId: "netflix-clone-c2ec9",
  storageBucket: "netflix-clone-c2ec9.firebasestorage.app",
  messagingSenderId: "143570354296",
  appId: "1:143570354296:web:4a979130b56edc7fbced8d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
  if (!name.trim()) {
    return toast.error("Name is required!");
  }
  if (name.length < 3) {
    return toast.error("Name must be at least 3 characters!");
  }
  if (!email.trim()) {
    return toast.error("Email is required!");
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return toast.error("Enter a valid email!");
  }
  if (!password.trim()) {
    return toast.error("Password is required!");
  }
  if (password.length < 6) {
    return toast.error("Password must be at least 6 characters!");
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
    toast.success("Signup successful! 🎉 Welcome " + name);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password)
    toast.success("Login Successful! 🎉");
  } catch (error) {
    console.log(error)
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = ()=>{
  signOut(auth)
}

export {auth, db, login, signup, logout}