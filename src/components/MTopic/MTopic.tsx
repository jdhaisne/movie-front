import { useState } from "react";
import { DataApi } from "../../pages/MMovie/MMovie";
import "./MTopic.css";
import { MComments } from "../MComments/MComments";
import { MTopicCard } from "./MTopicCard";
import { TTopic } from "../../type";

interface MTopicProps {
  ourData: TTopic[];
}

export const MTopic = (props: MTopicProps) => {
  const { ourData } = props;
  console.log(ourData);
  // console.log(ourData[0].image, 'testgenial')
  return (
    <div className="topicGlobal">
      <div className="topic">
        {ourData.map((elem: TTopic, index) => (
          <MTopicCard topic={elem} key={index}></MTopicCard>
        ))}
      </div>
    </div>
  );
};
