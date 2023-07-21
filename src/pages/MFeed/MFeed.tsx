import { useEffect, useState } from "react";
import { TLike, TTopic } from "../../type";
import { MTopicCard } from "../../components/MTopic/MTopicCard";
import { MComments } from "../../components/MComments/MComments";

export const MFeed = () => {
  const apiKey = "e8d2b17f";
  let topicsArray: TTopic[] = [];
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
<<<<<<< HEAD
    
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
=======
      likes.forEach(async (like: TLike) => {
        console.log("F", topicsArray, typeof topicsArray);
        try {
          const res = await fetch(`${url}topic/movie/${like.movieId}`);
          const resTopics: TTopic[] = await res.json();
          console.log("rest", resTopics, [...resTopics]);
          topicsArray.push(...resTopics);
          console.log(topicsArray);
          setTopics(topicsArray);
        } catch (error) {}
      });
>>>>>>> fab77ca4185e5bde9e18adac2a85caf124007f81
    };
    

    const all = async () => {
      // console.log(topicsArray)
      await getLikes();
<<<<<<< HEAD
      const topicsArray = await getTopics();
      console.log("ff", topicsArray, typeof topicsArray);
      console.log(topicsArray)
      setTopics(topicsArray);
      console.log(topicsArray)
=======
      await getTopics();
      console.log("ff", topicsArray);
>>>>>>> fab77ca4185e5bde9e18adac2a85caf124007f81
    };
    all();
    console.log(topicsArray);
    setTopics(topicsArray);
  }, []);
  console.log("topics", topics);
<<<<<<< HEAD

=======
>>>>>>> fab77ca4185e5bde9e18adac2a85caf124007f81
  return (
    <>
      <div onClick={() => setTopics(topicsArray)}>set</div>
      <div>
        {topics.map((topic, index) => {
<<<<<<< HEAD
          return (
            <>
              <MTopicCard topic={topic} key={index}></MTopicCard>
            </>
          );
=======
          return <MTopicCard topic={topic} key={index}></MTopicCard>;
>>>>>>> fab77ca4185e5bde9e18adac2a85caf124007f81
        })}
      </div>
    </>
  );
};
