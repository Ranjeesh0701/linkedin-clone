import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import { login, logout, selectUser } from "./features/userSlice";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import Widgets from "./components/Widgets";

function App() {
  const user = useSelector(selectUser);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setScreenWidth(window.innerWidth);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      <Header screenWidth={screenWidth} />

      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Feed screenWidth={screenWidth} />
          {screenWidth > 989 && <Widgets />}
        </div>
      )}
    </div>
  );
}

export default App;
