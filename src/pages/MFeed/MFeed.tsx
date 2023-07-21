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
    
      try {
        const topicPromises = likes.map(async (like: TLike) => {
          try {
            const res = await fetch(`${url}topic/${like.movieId}`);
            const resTopics: TTopic[] = await res.json();
            return resTopics;
          } catch (error) {
            return [];
          }
        });
    
        const topicsArrays = await Promise.all(topicPromises);
        const mergedTopics = topicsArrays.flat();
        console.log(mergedTopics);
        return mergedTopics;
      } catch (error) {
        return [];
      }
    };
    

    const all = async () => {
      // console.log(topicsArray)
      await getLikes();
      const topicsArray = await getTopics();
      console.log("ff", topicsArray, typeof topicsArray);
      console.log(topicsArray)
      setTopics(topicsArray);
      console.log(topicsArray)
    };
    all();
  }, []);
  console.log("topics", topics);

  return (
    <>
      <div>
        {topics.map((topic, index) => {
          return (
            <>
              <MTopicCard topic={topic} key={index}></MTopicCard>
            </>
          );
        })}
      </div>
    </>
  );
};
