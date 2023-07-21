import { useEffect, useState } from "react";
import { TLike, TTopic } from "../../type";
import { MTopicCard } from "../../components/MTopic/MTopicCard";

export const MFeed = () => {
  const apiKey = "e8d2b17f";
  const [topics, setTopics] = useState<any[]>([
    {
      id: "",
      title: "",
      subject: "",
      type: "",
      movieId: "",
    },
  ]);
  // useEffect(() => {
  //   console.log(topics, Array(topics)[0]);
  // }, [topics]);

  useEffect(() => {
    const url = `http://localhost:3000/`;
    let topicsArray: TTopic[] = [];
    let likes: TLike[] = [];

    const getLikes = async () => {
      try {
        const res = await fetch(
          `${url}like/user/${localStorage.getItem("id")}`
        );
        if (res.ok) {
          likes = await res.json();
          console.log(likes);
        } else {
          console.log("err", res);
        }
      } catch (error) {}
    };

    const getTopics = async () => {
      console.log("t", likes, typeof likes);
      likes.forEach(async (like: TLike) => {
        console.log("F", topicsArray, typeof topicsArray);
        try {
          const res = await fetch(`${url}topic/movie/${like.movieId}`);
          const resTopics: TTopic[] = await res.json();
          topicsArray.push(...resTopics);
        } catch (error) {}
      });
    };
    const all = async () => {
      await getLikes();
      await getTopics();
      console.log("ff", [...topicsArray], typeof [...topicsArray]);
      setTopics(likes);
    };
    all();
  }, []);
  console.log("topics", topics);
  let r;
  return (
    <>
      <div>
        {topics.map((topic, index) => {
          return <div>{JSON.stringify(topic)}</div>;
        })}
      </div>
    </>
  );
};
