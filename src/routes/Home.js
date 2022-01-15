import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { dbService } from "../fbase";

function Home({ userObj }) {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  console.log(nweets);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          type="text"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      {nweets.map((nweet) => (
        <div key={nweet.id}>
          <h4>{nweet.text}</h4>
        </div>
      ))}
    </div>
  );
}
export default Home;
