import { useState } from "react";
import { DataApi } from "../../pages/MMovie/MMovie";
import "./MTopic.css";
import { MComments } from "../MComments/MComments";

interface MTopicProps{
  ourData: DataApi[]
}

export const MTopic = (props:MTopicProps) => {
 const {ourData} = props
console.log(ourData)
  return (
    <div className="topicGlobal">
      <div className ="topic">
      {ourData.map((elem, index) => (
        <div className ="oneTopic" key={index}>
          <h3>{elem.title}</h3>
          <p>{elem.subject}</p>
          <p>{elem.type}</p>
          <MComments topicID = {elem.id}></MComments>
        </div>
        
      ))}
      </div>
      
    </div>
  );
};


