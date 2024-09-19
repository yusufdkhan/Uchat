import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    //auth state change
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = docSnap.data();
      setUser({
        ...user,
        username: data.username,
        profilUrl: data.profilUrl,
        userId: data.userId,
      });
    }
  };

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("createUserWithEmailAndPassword"))
        msg = " Invalid Email";
      if (msg.includes("auth/invalid-credential")) msg = "Wrong credentials";

      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };
  const register = async (email, password, username, profilUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("response user :", response?.user);

      // setUser(response?.user)
      // setIsAuthenticated(true)

      await setDoc(doc(db, "users", response?.user?.uid), {
        username,
        profilUrl,
        userId: response?.user?.uid,
      });
      return { success: true, data: response?.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes("createUserWithEmailAndPassword"))
        msg = " Invalid Email";
      if (msg.includes("auth/email-already-in-use"))
        msg = "Email already in Use";
      return { success: false, msg };
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("UseAuth must be wrapped inside AuthContextProvider");
  }
  return value;
};
