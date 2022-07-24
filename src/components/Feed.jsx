import React, { useEffect, useState } from "react";
import {
  Create,
  Photo,
  Subscriptions,
  EventNote,
  CalendarViewDay,
  Send,
} from "@mui/icons-material";
import "./Feed.css";
import InputOption from "./InputOption";
import Post from "./Post";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import FlipMove from "react-flip-move";

const Feed = () => {
  const user = useSelector(selectUser);

  const [input, setInput] = useState("");

  const [posts, setPosts] = useState();

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  const sendPost = (e) => {
    e.preventDefault();
    if(input === "") return;

    db.collection("posts").add({
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl: user.photoUrl || "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <Create />
          <form>
            <input
              type="text"
              value={input}
              onChange={({ target }) => setInput(target.value)}
            />
            <button onClick={sendPost} type="submit">
              <Send />
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={Photo} title="Photo" color="#70b5f9" />
          <InputOption Icon={Subscriptions} title="Video" color="#5f9b41" />
          <InputOption Icon={EventNote} title="Event" color="#c37d16" />
          <InputOption
            Icon={CalendarViewDay}
            title="Write Article"
            color="#e16745"
          />
        </div>
      </div>

      <FlipMove>
        {posts &&
          posts.map(
            ({ id, data: { name, description, message, photoUrl } }) => (
              <Post
                key={id}
                name={name}
                description={description}
                message={message}
                photoUrl={photoUrl}
              />
            )
          )}
      </FlipMove>
    </div>
  );
};

export default Feed;
