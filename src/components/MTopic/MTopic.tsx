import { useState } from "react";
import { DataApi } from "../../pages/MMovie/MMovie";
import "./MTopic.css";
import { MComments } from "../MComments/MComments";

interface MTopicProps{
  ourData: DataApi[]
}

export const MTopic = (props:MTopicProps) => {
 const {ourData} = props

  return (
    <div className="topicGlobal">
      <div className ="topic">
      {ourData.map((elem, index) => (
        <div className ="oneTopic" key={index}>
          <h3>{elem.Title}</h3>
          <p>{elem.Subject}</p>
          <p>{elem.Type}</p>
          <MComments topicID = {elem.Id}></MComments>
        </div>
        
      ))}
      </div>
      
    </div>
  );
};


